import { api } from '../lib/axios';

export interface OutreachResponse {
    status:  string;
    message: string;
}

export interface ContactPayload {
    name:    string;
    email:   string;
    message: string;
}

export const outreachApi = {
    subscribe: async (email: string): Promise<OutreachResponse> => {
        const response = await api.post<OutreachResponse>('/outreach/subscribe', { email });
        return response.data;
    },

    contact: async (payload: ContactPayload): Promise<OutreachResponse> => {
        const response = await api.post<OutreachResponse>('/outreach/contact', payload);
        return response.data;
    },
};