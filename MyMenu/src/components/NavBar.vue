<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

function handleLogout() {
  authStore.logout();
  router.push({ name: 'home' });
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }">MyMenu</router-link>
    </div>
    <div class="navbar-links">
      <router-link :to="{ name: 'home' }">Cardápio</router-link>
      <router-link :to="{ name: 'cart' }">
        Carrinho
        <span class="cart-count" v-if="cartStore.totalItems > 0">
          ({{ cartStore.totalItems }})
        </span>
      </router-link>

      <template v-if="!authStore.isLoggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </template>

      <template v-else>
        <span class="username">Olá, <strong>{{ authStore.username }}</strong></span>

        <a @click.prevent="handleLogout" href="#">Sair</a>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
}

.navbar-brand a {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  cursor: pointer;
}

.navbar a:hover {
  text-decoration: underline;
}

.username {
  margin-left: 1rem;
}

.cart-count {
  font-weight: bold;
  color: #ffc107;
}
</style>