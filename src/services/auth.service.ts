import { api } from '../lib/axios';

export interface IUser {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  username: string;
  avatar?: string;
  role: string;
  isVerified: boolean;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
    user: IUser;
  };
}

export interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const AuthService = {

  register: async (payload: RegisterPayload) => {
    const formData = new FormData();
    formData.append('fullName', payload.fullName);
    formData.append('username', payload.username);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    if (payload.avatar) formData.append('avatar', payload.avatar);

    const { data } = await api.post('/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  verifyEmail: async (email: string, otp: string) => {
    const { data } = await api.post('/auth/verify-email', { email, otp });
    return data;
  },

  resendOtp: async (email: string) => {
    const { data } = await api.post('/auth/resend-otp', { email });
    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  refreshToken: async () => {
    const { data } = await api.post('/auth/refresh-token');
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (email: string, otp: string, newPassword: string) => {
    const { data } = await api.post('/auth/reset-password', { email, otp, newPassword });
    return data;
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    const { data } = await api.patch('/auth/update-password', { currentPassword, newPassword });
    return data;
  },

  getProfile: async (): Promise<{ status: string; data: IUser }> => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  updateProfile: async (payload: Partial<Pick<IUser, 'fullName' | 'username'>> & { avatar?: File }) => {
    const formData = new FormData();
    if (payload.fullName) formData.append('fullName', payload.fullName);
    if (payload.username) formData.append('username', payload.username);
    if (payload.avatar) formData.append('avatar', payload.avatar);

    const { data } = await api.patch('/auth/update-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  deleteAccount: async () => {
    const { data } = await api.delete('/auth/delete-account');
    return data;
  },
};