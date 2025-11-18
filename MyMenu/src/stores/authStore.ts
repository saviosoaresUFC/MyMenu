import { defineStore } from 'pinia';
import { AuthService } from '@/services/authService';
import type { User, RegisterCredentials, LoginCredentials } from '@/types';

interface AuthState {
    user: User | null;
    jwt: string | null;
    isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = 'my-menu-auth';

function loadInitialState(): AuthState {
    try {
        const storedState = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            if (parsedState.user && parsedState.jwt !== null) {
                return parsedState as AuthState;
            }
        }
    } catch (e) {
        console.error("Erro ao carregar estado de autenticação:", e);
    }
    return {
        user: null,
        jwt: null,
        isAuthenticated: false,
    };
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => loadInitialState(),

    getters: {
        isLoggedIn: (state): boolean => state.isAuthenticated,
        username: (state): string => state.user?.username || 'Convidado',
        getJwt: (state): string | null => state.jwt,
    },

    actions: {
        _saveState(user: User | null, jwt: string | null): void {
            this.user = user;
            this.jwt = jwt;
            this.isAuthenticated = !!jwt;

            if (user && jwt) {
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
                    user,
                    jwt,
                    isAuthenticated: this.isAuthenticated,
                } as AuthState));
            } else {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        },

        async registerUser(credentials: RegisterCredentials): Promise<void> {
            const { jwt, user } = await AuthService.register(credentials);
            this._saveState(user, jwt);
        },

        async loginUser(credentials: LoginCredentials): Promise<void> {
            const { jwt, user } = await AuthService.login(credentials);
            this._saveState(user, jwt);
        },

        logout(): void {
            this._saveState(null, null);
        }
    }
});