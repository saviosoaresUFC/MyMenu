import api from '@/services/api';
import type { AuthResponse, RegisterCredentials, LoginCredentials } from '@/types';

export const AuthService = {
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/local/register', credentials);
        return response.data;
    },


    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/local', credentials);
        return response.data;
    },
};