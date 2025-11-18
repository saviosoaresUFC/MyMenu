<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useNotificationStore } from '@/stores/notificationsStore';
import type { MenuItem } from '@/types/'

const props = defineProps<{
  item: MenuItem
}>()

const authStore = useAuthStore();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function handleAddToCart() {
  if (!authStore.isLoggedIn) {
    notificationStore.addError('Você precisa estar logado para adicionar itens ao carrinho.');
    return;
  }

  cartStore.addItem({
    id: props.item.id,
    name: props.item.name,
    price: props.item.price,
  });

  notificationStore.addSuccess(`"${props.item.name}" adicionado ao carrinho!`);
}

</script>

<template>
  <div class="menu-item">
    <img :src="item.image" :alt="item.name" class="item-image" />
    <div class="item-details">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <div class="item-footer">
        <span class="price">{{ formatCurrency(item.price) }}</span>
        <button @click="handleAddToCart">Adicionar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.item-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.item-details {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.item-details h3 {
  margin-top: 0;
}

.item-footer {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
