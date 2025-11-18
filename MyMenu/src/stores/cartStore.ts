import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CART_STORAGE_KEY = 'my-menu-cart';

function loadInitialCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      return JSON.parse(storedCart) as CartItem[];
    }
  } catch (e) {
    console.error("Erro ao carregar carrinho do Local Storage:", e);
  }
  return [];
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadInitialCart());

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value));
  }

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const isEmpty = computed(() => items.value.length === 0);

  // Adiciona item ao carrinho
  function addItem(product: Pick<CartItem, 'id' | 'name' | 'price'>) {
    const existingItem = items.value.find(item => item.id === product.id);

    if (existingItem) {
      // aumenta a quantidade
      existingItem.quantity++;
    } else {
      // adiciona um novo CartItem
      items.value.push({
        ...product,
        quantity: 1,
      });
    }
    saveCart();
  }

  function removeItem(productId: number) {
    items.value = items.value.filter(item => item.id !== productId);
    saveCart();
  }

  function clearCart() {
    items.value = [];
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  return {
    items,
    totalItems,
    cartTotal,
    isEmpty,
    addItem,
    removeItem,
    clearCart
  };
});