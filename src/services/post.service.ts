import { api } from '../lib/axios';

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPostSection {
  _id?: string;
  type: 'text' | 'image' | 'video' | 'heading';
  content?: string;
  mediaUrl?: string;
  caption?: string;
  headingLevel?: number;
}

export interface IAuthor {
  _id: string;
  fullName: string;
  avatar?: string;
  username?: string;
}

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  sections?: IPostSection[];
  type: 'article' | 'video' | 'audio';
  category: ICategory;
  author: IAuthor;
  tags?: string[];
  thumbnail?: string;
  mediaUrl?: string;
  duration?: number;
  mediaMeta?: {
    videoId?: string;
    platform?: string;

    spotifyId?: string;
    spotifyType?: 'track' | 'episode' | 'album' | 'playlist';
    trackList?: string[];
  };
  readTime?: number;
  viewsCount?: number;
  featured: boolean;
  pinnedTrending: boolean;
  trendingScore: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data: T;
}

export interface PaginatedData<T> {
  posts: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> {}

export type PostType = 'article' | 'video' | 'audio';
export type PostStatus = 'draft' | 'published';

export interface GetPostsParams {
  page?:     number;
  limit?:    number;
  status?:   PostStatus;
  type?:     PostType;
  category?: string;
  tags?:     string;
}

export interface SearchPostsParams {
  q:          string;
  page?:      number;
  limit?:     number;
  type?:      PostType;
  category?:  string;
}

export interface GetTrendingParams {
  limit?: number;
  type?:  PostType;
}

export interface GetFeaturedParams {
  limit?: number;
}

export const PostService = {

  /** Fetch all categories sorted by most recently created. */
  getCategories: async (): Promise<ApiResponse<ICategory[]>> => {
    const { data } = await api.get<ApiResponse<ICategory[]>>('/categories');
    return data;
  },

  /**
   * Fetch a paginated list of posts.
   * Filter by status, type (article | video | audio), category (ObjectId), or tags.
   * Use this for: article pages, video pages, audio pages, category pages, combined feeds.
   */
  getPosts: async (
    params?: GetPostsParams,
  ): Promise<PaginatedResponse<IPost>> => {
    const { data } = await api.get<PaginatedResponse<IPost>>('/posts', { params });
    return data;
  },

  /**
   * Full-text search across post titles and excerpts.
   * Only searches published posts. Results ranked by relevance score.
   * Optionally filter by type and/or category.
   */
  searchPosts: async (
    params: SearchPostsParams,
  ): Promise<PaginatedResponse<IPost>> => {
    const { data } = await api.get<PaginatedResponse<IPost>>('/posts/search', { params });
    return data;
  },

  /**
   * Fetch published featured posts.
   * Sorted by most recently created. Defaults to 5 results.
   */
  getFeaturedPosts: async (
    params?: GetFeaturedParams,
  ): Promise<ApiResponse<IPost[]>> => {
    const { data } = await api.get<ApiResponse<IPost[]>>('/posts/featured', { params });
    return data;
  },

  /**
   * Fetch trending published posts.
   * Sorted by: pinned first → trending score → most recent.
   * Optionally filter by type (article | video | audio).
   */
  getTrendingPosts: async (
    params?: GetTrendingParams,
  ): Promise<ApiResponse<IPost[]>> => {
    const { data } = await api.get<ApiResponse<IPost[]>>('/posts/trending', { params });
    return data;
  },

  /**
   * Fetch a single post by its slug.
   * Also fires a background view tracking event on the server.
   */
  getPostBySlug: async (slug: string): Promise<ApiResponse<IPost>> => {
    const { data } = await api.get<ApiResponse<IPost>>(`/posts/${slug}`);
    return data;
  },

  /** Fetch published articles only — for the articles/blog page. */
  getArticles: async (params?: Omit<GetPostsParams, 'type'>): Promise<PaginatedResponse<IPost>> => {
    return PostService.getPosts({ ...params, type: 'article', status: 'published' });
  },

  /** Fetch published video posts only — for the videos page. */
  getVideos: async (params?: Omit<GetPostsParams, 'type'>): Promise<PaginatedResponse<IPost>> => {
    return PostService.getPosts({ ...params, type: 'video', status: 'published' });
  },

  /** Fetch published audio posts only — for the podcast/audio page. */
  getAudioPosts: async (params?: Omit<GetPostsParams, 'type'>): Promise<PaginatedResponse<IPost>> => {
    return PostService.getPosts({ ...params, type: 'audio', status: 'published' });
  },

  /** Fetch published posts by category ObjectId — for category pages. */
  getPostsByCategory: async (
    categoryId: string,
    params?: Omit<GetPostsParams, 'category'>,
  ): Promise<PaginatedResponse<IPost>> => {
    return PostService.getPosts({ ...params, category: categoryId, status: 'published' });
  },

  /** Fetch published posts by one or more tags — e.g. tag cloud / tag pages. */
  getPostsByTags: async (
    tags: string[],
    params?: Omit<GetPostsParams, 'tags'>,
  ): Promise<PaginatedResponse<IPost>> => {
    return PostService.getPosts({ ...params, tags: tags.join(','), status: 'published' });
  },

  /** Fetch trending videos only — for a dedicated trending videos section. */
  getTrendingVideos: async (limit?: number): Promise<ApiResponse<IPost[]>> => {
    return PostService.getTrendingPosts({ type: 'video', limit });
  },

  /** Fetch trending audio only — for a dedicated trending podcast section. */
  getTrendingAudio: async (limit?: number): Promise<ApiResponse<IPost[]>> => {
    return PostService.getTrendingPosts({ type: 'audio', limit });
  },

  /** Fetch trending articles only — for a dedicated trending articles section. */
  getTrendingArticles: async (limit?: number): Promise<ApiResponse<IPost[]>> => {
    return PostService.getTrendingPosts({ type: 'article', limit });
  },
};