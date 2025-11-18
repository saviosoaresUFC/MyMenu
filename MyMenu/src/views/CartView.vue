<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import { useNotificationStore } from '@/stores/notificationsStore';

const cartStore = useCartStore();
const notificationStore = useNotificationStore();

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function checkout() {
  notificationStore.addSuccess("Pedido finalizado com sucesso!");
  cartStore.clearCart();
}

</script>

<template>
  <div class="cart-view">
    <h2>Seu Carrinho</h2>

    <div v-if="cartStore.isEmpty" class="empty-cart">
      <p>Seu carrinho está vazio.</p>
      <router-link :to="{ name: 'home' }">Ver cardápio</router-link>
    </div>

    <div v-else>
      <ul class="cart-items">
        <li v-for="cartItem in cartStore.items" :key="cartItem.id" class="cart-item">
          <div class="item-info">
            <span class="item-name">{{ cartItem.name }} ({{ cartItem.quantity }}x)</span>
            <span class="item-price">{{ formatCurrency(cartItem.price * cartItem.quantity) }}</span>
          </div>

          <button class="remove-btn" style="margin-left: 10px; background: #c82333;"
            @click="cartStore.removeItem(cartItem.id)">
            Remover
          </button>
        </li>
      </ul>

      <div class="cart-summary">
        <p>Total de unidades: <strong>{{ cartStore.totalItems }}</strong></p>

        <p class="total-price">Total: {{ formatCurrency(cartStore.cartTotal) }}</p>

        <button class="checkout-btn" @click="checkout">Finalizar Pedido</button>

        <button class="clear-btn" @click="cartStore.clearCart">Limpar Carrinho</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: bold;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #c82333;
}

.cart-summary {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #000;
  text-align: right;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
}

.checkout-btn, .clear-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.checkout-btn {
  background-color: #28a745;
}

.checkout-btn:hover {
  background-color: #176929;
}

.clear-btn {
  background-color: #6c757d;
  margin-left: 0.5rem;
}

.clear-btn:hover {
  background-color: #474a4d;
}
</style>
