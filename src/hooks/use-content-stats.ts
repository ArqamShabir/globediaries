import { useEffect, useState } from 'react';
import { WORDPRESS_API_URL } from '@/data/blogs';

type ContentTotals = {
  countries: number | null;
  cities: number | null;
  stories: number | null;
};

type ContentStatsState = ContentTotals & {
  loading: boolean;
  error?: string;
};

let cachedTotals: ContentTotals | null = null;
let inflight: Promise<ContentTotals> | null = null;

async function fetchTotal(url: string, signal: AbortSignal): Promise<number | null> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load totals from ${url}`);
  }

  const headerValue = response.headers.get('X-WP-Total');
  if (headerValue) {
    const parsed = parseInt(headerValue, 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  try {
    const data = await response.json();
    return Array.isArray(data) ? data.length : null;
  } catch (error) {
    console.error('Error parsing WordPress totals', error);
    return null;
  }
}

async function loadTotals(): Promise<ContentTotals> {
  if (cachedTotals) {
    return cachedTotals;
  }

  const controller = new AbortController();
  const { signal } = controller;

  try {
    const [countries, cities, stories] = await Promise.all([
      fetchTotal(`${WORDPRESS_API_URL}/posts?categories=4&per_page=1&_fields=id`, signal),
      fetchTotal(`${WORDPRESS_API_URL}/posts?categories=5&per_page=1&_fields=id`, signal),
      fetchTotal(`${WORDPRESS_API_URL}/posts?categories_exclude=4,5&per_page=1&_fields=id`, signal),
    ]);

    cachedTotals = { countries, cities, stories };
    return cachedTotals;
  } finally {
    controller.abort();
  }
}

export function useContentStats(): ContentStatsState {
  const [state, setState] = useState<ContentStatsState>({
    countries: cachedTotals?.countries ?? null,
    cities: cachedTotals?.cities ?? null,
    stories: cachedTotals?.stories ?? null,
    loading: !cachedTotals,
  });

  useEffect(() => {
    if (cachedTotals) {
      setState({ ...cachedTotals, loading: false });
      return;
    }

    let cancelled = false;

    if (!inflight) {
      inflight = loadTotals().finally(() => {
        inflight = null;
      });
    }

    inflight
      .then((totals) => {
        if (cancelled) return;
        setState({ ...totals, loading: false });
      })
      .catch((error: Error) => {
        if (cancelled) return;
        console.error('Failed to load content stats', error);
        setState((prev) => ({ ...prev, loading: false, error: error.message }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
