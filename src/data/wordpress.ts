export interface WordPressCountry {
  id: number;
  slug: string;
  name: string;
  description: string;
  excerpt: string;
  content: string;
  featured_media_url?: string;
  acf?: {
    capital?: string;
    population?: string;
    language?: string;
    currency?: string;
    best_time?: string;
    overview?: string;
    attractions?: string[];
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
  acf?: {
    country_slug?: string;
    best_time?: string;
    population?: string;
    overview?: string;
    attractions?: string[];
    tips?: string[];
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  categories: number[];
  tags: number[];
}

const WORDPRESS_BASE_URL = 'https://lightseagreen-badger-976849.hostingersite.com/wp-json/wp/v2';

export const fetchWordPressCountries = async (): Promise<WordPressCountry[]> => {
  try {
    // Fetch posts with 'country' category (assuming category ID 5 for countries)
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?categories=4&per_page=50&_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const posts = await response.json();
    
    return posts.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      name: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      acf: post.acf || {},
      categories: post.categories,
      tags: post.tags
    }));
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
    
    return posts.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      name: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      acf: post.acf || {},
      categories: post.categories,
      tags: post.tags
    }));
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
    
    return {
      id: post.id,
      slug: post.slug,
      name: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      acf: post.acf || {},
      categories: post.categories,
      tags: post.tags
    };
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
    
    return {
      id: post.id,
      slug: post.slug,
      name: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      acf: post.acf || {},
      categories: post.categories,
      tags: post.tags
    };
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
    
    return posts
      .map((post: any) => ({
        id: post.id,
        slug: post.slug,
        name: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 200),
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        acf: post.acf || {},
        categories: post.categories,
        tags: post.tags
      }))
      .filter((city: WordPressCity) => 
        city.acf?.country_slug === countrySlug || 
        city.content.toLowerCase().includes(countrySlug.toLowerCase())
      );
  } catch (error) {
    console.error('Error fetching cities by country:', error);
    return [];
  }
};