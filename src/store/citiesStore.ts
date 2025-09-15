import { useEffect, useState } from 'react';
import { fetchWordPressCities, WordPressCity } from '@/data/wordpress';
import { fetchWordPressCategories, WordPressCategory } from '@/data/blogs';

type CitiesState = {
  cities: WordPressCity[];
  areas: WordPressCategory[]; // derived from categories on city posts
  loading: boolean;
  error?: string;
  refresh: () => Promise<void>;
};

let cache: { cities: WordPressCity[]; areas: WordPressCategory[] } | null = null;
let inflight: Promise<void> | null = null;

export function useCitiesStore(): CitiesState {
  const [cities, setCities] = useState<WordPressCity[]>(cache?.cities || []);
  const [areas, setAreas] = useState<WordPressCategory[]>(cache?.areas || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | undefined>(undefined);

  const load = async () => {
    try {
      setLoading(true);
      const [cityPosts, allCategories] = await Promise.all([
        fetchWordPressCities(),
        fetchWordPressCategories(),
      ]);

      // Derive areas = categories that appear on city posts (excluding master Cities category id=5)
      const categoryIds = new Set<number>();
      for (const c of cityPosts) {
        (c.categories || []).forEach((id) => categoryIds.add(id));
      }
      // Commonly, the id=5 is the "Cities" bucket; remove if present
      categoryIds.delete(5);
      const derivedAreas = allCategories.filter((cat: WordPressCategory) => categoryIds.has(cat.id));

      cache = { cities: cityPosts, areas: derivedAreas };
      setCities(cityPosts);
      setAreas(derivedAreas);
      setError(undefined);
    } catch (e: any) {
      setError(e?.message || 'Failed to load cities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cache) return; // already primed
    if (!inflight) {
      inflight = load().finally(() => {
        inflight = null;
      });
    } else {
      // another component is loading; adopt results when finished
      inflight.then(() => {
        if (cache) {
          setCities(cache.cities);
          setAreas(cache.areas);
          setLoading(false);
        }
      });
    }
  }, []);

  return {
    cities,
    areas,
    loading,
    error,
    refresh: load,
  };
}

