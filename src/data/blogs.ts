export interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  author: number;
  date: string;
  categories: number[];
  tags: number[];
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  acf?: Record<string, unknown>;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressAuthor {
  id: number;
  name: string;
}

export const WORDPRESS_API_URL = 'https://lightseagreen-badger-976849.hostingersite.com/wp-json/wp/v2';

export const blogCategories = [
  { name: "All", slug: "" },
  { name: "Travel Guides", slug: "travel-guides" },
  { name: "Food & Culture", slug: "food-culture" },
  { name: "Adventure Travel", slug: "adventure-travel" },
  { name: "Budget Travel", slug: "budget-travel" },
  { name: "Luxury Travel", slug: "luxury-travel" },
];

// Fetch functions for WordPress content
export const fetchWordPressPosts = async (category = '', search = '', page = 1, perPage = 10) => {
  try {
    let url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
    
    if (category) {
      const categoriesResponse = await fetch(`${WORDPRESS_API_URL}/categories?slug=${category}`);
      const categories = await categoriesResponse.json();
      if (categories.length > 0) {
        url += `&categories=${categories[0].id}`;
      }
    }
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
};

export const fetchWordPressPost = async (id: number) => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts/${id}?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return null;
  }
};

export const fetchWordPressCategories = async () => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
};

// Helper functions to format WordPress data
export const formatBlogPost = (post: BlogPost) => {
  const slugify = (s: string | undefined) =>
    (s || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  type MediaSize = { source_url?: string; width?: number } | undefined;
  const media = (post as any)?._embedded?.['wp:featuredmedia']?.[0] as Record<string, any> | undefined;
  const featuredImage =
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium?.source_url ||
    media?.source_url ||
    '/placeholder.svg';
  const imageFull = media?.source_url || featuredImage;
  // Build srcset from WP media sizes
  const sizesObj = (media?.media_details?.sizes as Record<string, MediaSize>) || {};
  const items: string[] = [];
  const seen = new Set<number>();
  for (const key of Object.keys(sizesObj)) {
    const entry = sizesObj[key];
    const w = entry?.width;
    const url = entry?.source_url;
    if (w && url && !seen.has(w)) {
      items.push(`${url} ${w}w`);
      seen.add(w);
    }
  }
  const fullW = media?.media_details?.width;
  const fullUrl = media?.source_url;
  if (fullW && fullUrl && !seen.has(fullW)) {
    items.push(`${fullUrl} ${fullW}w`);
  }
  const imageSrcSet = items.length
    ? items.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1])).join(', ')
    : undefined;
  const author = (post._embedded as any)?.author?.[0]?.name || 'GlobeDiaries Team';
  const categories = (post._embedded as any)?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0].name : 'Travel';
  const categorySlugs: string[] = categories.map((c: any) => (c?.slug || '').toString().toLowerCase());
  const hasWpBlogCategory = categorySlugs.includes('blog') || categories.some((c: any) => (c?.name || '').toString().toLowerCase() === 'blog');
  const blogAcfCategory = (post as any)?.acf?.blog_category as string | undefined;
  const blogAcfCategorySlug = slugify(blogAcfCategory);
  
  return {
    id: post.id,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    content: post.content.rendered,
    image: featuredImage,
    image_full: imageFull,
    image_srcset: imageSrcSet,
    author,
    date: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readTime: `${Math.ceil(post.content.rendered.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read`,
    category,
    blog_acf_category: blogAcfCategory || undefined,
    blog_acf_category_slug: blogAcfCategorySlug || undefined,
    wp_category_slugs: categorySlugs,
    has_wp_blog_category: hasWpBlogCategory,
    slug: post.slug,
    categories: categories.map(cat => cat.name),
    tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || []
  };
};

export const fetchWordPressPostBySlug = async (slug: string) => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch post by slug');
    }
    const arr = await response.json();
    return arr && arr[0] ? arr[0] : null;
  } catch (error) {
    console.error('Error fetching WordPress post by slug:', error);
    return null;
  }
};
