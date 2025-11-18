<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMenuItems } from '@/services/menuService'
import type { MenuItem } from '@/types'
import MenuItemCard from '@/components/MenuItemCard.vue'

const items = ref<MenuItem[]>([])

onMounted(async () => {
  items.value = await getMenuItems()
})
</script>

<template>
  <div class="home-view">
    <h1>Nosso Cardápio</h1>
    <div class="menu-items">
      <MenuItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 1rem;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>