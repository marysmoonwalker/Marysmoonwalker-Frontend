import { api } from '../lib/axios';

export interface IForumThread {
    _id: string;
    title: string;
    body: string;
    excerpt: string;
    category: string;
    author: {
        _id: string;
        fullName: string;
        username: string;
        avatar: string;
    };
    replyCount: number;
    viewCount: number;
    pinned: boolean;
    hot: boolean;
    lastActive: string;
    createdAt: string;
}

export interface IForumReply {
    _id: string;
    body: string;
    author: {
        _id: string;
        fullName: string;
        username: string;
        avatar: string;
    };
    imageUrl?: string;
    likes: string[];
    createdAt: string;
}

export interface ForumResponse {
    threads: IForumThread[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasMore: boolean;
    };
}

export const forumApi = {
    // Fetch all threads with optional filters
    getThreads: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
        const response = await api.get<{ data: ForumResponse }>('/forum', { params });
        return response.data.data;
    },

    // Get a single thread and its replies
    getThreadDetails: async (id: string) => {
        const response = await api.get<{ data: { thread: IForumThread; replies: IForumReply[] } }>(`/forum/${id}`);
        return response.data.data;
    },

    // Create a new discussion
    createThread: async (threadData: { title: string; body: string; category: string; excerpt?: string }) => {
        const response = await api.post<{ data: IForumThread }>('/forum', threadData);
        return response.data.data;
    },

    // Post a reply (Handles optional image upload)
    addReply: async (threadId: string, body: string, file?: File) => {
        const formData = new FormData();
        formData.append('body', body);
        if (file) {
            formData.append('image', file);
        }
        
        const response = await api.post<{ data: IForumReply }>(`/forum/${threadId}/replies`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data;
    },

    // Like/Unlike a reply
    toggleLike: async (replyId: string) => {
        const response = await api.patch<{ data: { likes: number; liked: boolean } }>(`/forum/replies/${replyId}/like`);
        return response.data.data;
    }
};