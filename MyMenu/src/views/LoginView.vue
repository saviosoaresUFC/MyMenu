<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import type { LoginCredentials } from '@/types';
import type { AxiosError } from 'axios';

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

const form = ref<Partial<LoginCredentials>>({
    identifier: '',
    password: '',
});

const isLoading = ref(false);
const error = ref<string | null>(null);

async function handleSubmit() {
    if (!form.value.identifier || !form.value.password) {
        error.value = 'Por favor, preencha o email e a senha.';
        return;
    }

    const credentials: LoginCredentials = {
        identifier: form.value.identifier,
        password: form.value.password,
    };

    isLoading.value = true;
    error.value = null;

    try {
        await authStore.loginUser(credentials);

        const redirectTo = route.query.redirect || { name: 'home' };

        router.push(redirectTo as string);

    } catch (e) {
        let errorMessage = 'Falha no login. Verifique suas credenciais.';

        const axiosError = e as AxiosError;
        if (axiosError.response && typeof axiosError.response.data === 'object' &&
            (axiosError.response.data as { error?: { message?: string } })?.error?.message) {
            errorMessage = (axiosError.response.data as { error: { message: string } }).error.message;
        } else if (e instanceof Error) {
            errorMessage = e.message;
        }

        error.value = errorMessage;

    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="login-view">
        <form class="login-form" @submit.prevent="handleSubmit">
            <h2>Login</h2>

            <div v-if="error" class="error-message">
                {{ error }}
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.identifier" required :disabled="isLoading" />
            </div>
            <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="form.password" required :disabled="isLoading" />
            </div>
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </button>
            <p class="register-link">
                Não tem uma conta? <router-link :to="{ name: 'register' }">Cadastre-se</router-link>
            </p>
        </form>
    </div>
</template>

<style scoped>
.login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.login-form {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}
.register-link {
    margin-top: 1rem;
    text-align: center;
}

.error-message {
    color: #dc3545;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-size: 0.9rem;
}
</style>