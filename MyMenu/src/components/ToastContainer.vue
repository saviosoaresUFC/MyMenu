<template>
  <div class="toast-container">
    <ToastNotification
      v-for="notification in unreadNotifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ToastNotification from './ToastNotification.vue'
import { useNotificationStore } from '@/stores/notificationsStore'

const unreadNotifications = computed(() => useNotificationStore().unreadNotifications)
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
