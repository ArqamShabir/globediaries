export interface WordPressCountry {
  id: number;
  slug: string;
  name: string;
  description: string;
  excerpt: string;
  content: string;
  featured_media_url?: string;
  featured_media_full_url?: string;
  featured_media_srcset?: string;
  acf?: {
    tagline?: string;
    capital?: string;
    population?: string;
    continent?: string;
    language?: string;
    currency?: string;
    best_time?: string;
    overview?: string;
    attractions?: string | string[];
  };
  categories: number[];
  tags: number[];
}

export interface WordPressCity {
  id: number;
  slug: string;
  name: string;
  description: string;
  excerpt: string;
  content: string;
  featured_media_url?: string;
  featured_media_srcset?: string;
  acf?: {
    country_slug?: string;
    country?: string;
    best_time?: string;
    population?: string;
    overview?: string;
    language?: string;   
      attractions?: string | string[]; // 👈 same here
    tips?: string | string[];   
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  categories: number[];
  tags: number[];
}

const WORDPRESS_BASE_URL = 'https://lightseagreen-badger-976849.hostingersite.com/wp-json/wp/v2';

// Build a srcset string from WP media sizes
const buildSrcSet = (media: any): string | undefined => {
  const sizes = media?.media_details?.sizes || {};
  const items: string[] = [];
  // Collect width candidates, avoiding duplicates
  const seen = new Set<number>();
  for (const key of Object.keys(sizes)) {
    const entry = sizes[key];
    const w = entry?.width;
    const url = entry?.source_url;
    if (w && url && !seen.has(w)) {
      items.push(`${url} ${w}w`);
      seen.add(w);
    }
  }
  // Fallback to original
  const fullW = media?.media_details?.width;
  const fullUrl = media?.source_url;
  if (fullW && fullUrl && !seen.has(fullW)) {
    items.push(`${fullUrl} ${fullW}w`);
  }
  return items.length ? items.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1])).join(', ') : undefined;
};

export const fetchWordPressCountries = async (): Promise<WordPressCountry[]> => {
  try {
    // Fetch posts with 'country' category (assuming category ID 5 for countries)
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?categories=4&per_page=50&_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const posts = await response.json();
    
    return posts.map((post: any) => {
      const media = post._embedded?.['wp:featuredmedia']?.[0];
      const sizedUrl =
        media?.media_details?.sizes?.medium_large?.source_url ||
        media?.media_details?.sizes?.large?.source_url ||
        media?.media_details?.sizes?.medium?.source_url ||
        media?.source_url;
      const srcset = buildSrcSet(media);

      return {
        id: post.id,
        slug: post.slug,
        name: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        featured_media_url: sizedUrl,
        featured_media_srcset: srcset,
        acf: post.acf || {},
        categories: post.categories,
        tags: post.tags,
      } as WordPressCountry;
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchWordPressCities = async (): Promise<WordPressCity[]> => {
  try {
    // Fetch posts with 'city' category (assuming category ID 6 for cities)
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?categories=5&per_page=100&_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    
    const posts = await response.json();
    
    return posts.map((post: any) => {
      const media = post._embedded?.['wp:featuredmedia']?.[0];
      const sizedUrl =
        media?.media_details?.sizes?.medium_large?.source_url ||
        media?.media_details?.sizes?.large?.source_url ||
        media?.media_details?.sizes?.medium?.source_url ||
        media?.source_url;
      const srcset = buildSrcSet(media);

      return {
        id: post.id,
        slug: post.slug,
        name: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        featured_media_url: sizedUrl,
        featured_media_srcset: srcset,
        acf: post.acf || {},
        categories: post.categories,
        tags: post.tags,
      } as WordPressCity;
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const fetchWordPressCountryBySlug = async (slug: string): Promise<WordPressCountry | null> => {
  try {
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?slug=${slug}&categories=4&_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch country');
    }
    
    const posts = await response.json();
    
    if (posts.length === 0) {
      return null;
    }
    
    const post = posts[0];
    
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    const sizedUrl = media?.source_url ||
      media?.media_details?.sizes?.large?.source_url ||
      media?.media_details?.sizes?.medium_large?.source_url ||
      media?.media_details?.sizes?.medium?.source_url;
    const srcset = buildSrcSet(media);

    return {
      id: post.id,
      slug: post.slug,
      name: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_media_url: sizedUrl,
      featured_media_full_url: media?.source_url,
      featured_media_srcset: srcset,
      acf: post.acf || {},
      categories: post.categories,
      tags: post.tags,
    } as WordPressCountry;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
};

export const fetchWordPressCityBySlug = async (slug: string): Promise<WordPressCity | null> => {
  try {
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?slug=${slug}&categories=5&_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch city');
    }
    
    const posts = await response.json();
    
    if (posts.length === 0) {
      return null;
    }
    
    const post = posts[0];
    
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    const sizedUrl =
      media?.media_details?.sizes?.large?.source_url ||
      media?.media_details?.sizes?.medium_large?.source_url ||
      media?.media_details?.sizes?.medium?.source_url ||
      media?.source_url;
    const srcset = buildSrcSet(media);

    return {
      id: post.id,
      slug: post.slug,
      name: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_media_url: sizedUrl,
      featured_media_srcset: srcset,
      acf: post.acf || {},
      categories: post.categories,
      tags: post.tags,
    } as WordPressCity;
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
};

export const fetchCitiesByCountrySlug = async (countrySlug: string): Promise<WordPressCity[]> => {
  try {
    // Fetch cities that have the country slug in their ACF field or tags
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?categories=5&per_page=100&_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    
    const posts = await response.json();
    
    const slugify = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    return posts
      .map((post: any) => {
        const media = post._embedded?.['wp:featuredmedia']?.[0];
        const sizedUrl =
          media?.media_details?.sizes?.medium_large?.source_url ||
          media?.media_details?.sizes?.large?.source_url ||
          media?.media_details?.sizes?.medium?.source_url ||
          media?.source_url;
        const srcset = buildSrcSet(media);

        return {
          id: post.id,
          slug: post.slug,
          name: post.title.rendered,
          description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          featured_media_url: sizedUrl,
          featured_media_srcset: srcset,
          acf: post.acf || {},
          categories: post.categories,
          tags: post.tags,
        } as WordPressCity;
      })
      .filter((city: WordPressCity) => {
        const slugMatch = city.acf?.country_slug?.toLowerCase() === countrySlug.toLowerCase();
        const nameSlug = city.acf?.country ? slugify(city.acf.country) : '';
        const nameMatch = !!nameSlug && nameSlug === countrySlug.toLowerCase();
        const contentMatch = city.content.toLowerCase().includes(countrySlug.toLowerCase());
        return slugMatch || nameMatch || contentMatch;
      });
  } catch (error) {
    console.error('Error fetching cities by country:', error);
    return [];
  }
};
