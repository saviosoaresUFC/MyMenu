<template>
  <div
    class="toast-notification"
    :class="[`toast--${notification.type}`, dismissed ? 'dismissed' : '']"
  >
    <p>{{ notification.message }}</p>
    <button @click="dismiss">×</button>
    <hr v-show="timeout > 0" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Notification, useNotificationStore } from '@/stores/notificationsStore'

const props = withDefaults(defineProps<{ notification: Notification; timeout?: number }>(), {
  timeout: 5000,
})

const dismissed = ref(false)
const animationDelay = 1500
const animationDuration = `${props.timeout / 1000}s`

const notificationStore = useNotificationStore()

const dismiss = () => {
  setTimeout(() => {
    notificationStore.markAsRead(props.notification.id)
  }, 1500)
  dismissed.value = true
}

if (props.timeout > 0) setTimeout(dismiss, props.timeout + animationDelay)
</script>

<style scoped>
.toast-notification {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  color: white;
  margin-top: 8px;
  animation: 1.5s slide-in;
}

.toast-notification.dismissed {
  animation: 1.5s slide-out forwards;
}

@keyframes slide-in {
  from {
    translate: 150vw 0;
  }

  to {
    translate: 0 0;
  }
}

@keyframes slide-out {
  to {
    translate: 150vw 0;
  }

  from {
    translate: 0 0;
  }
}
.toast--success {
  background-color: #4caf50;
}

.toast--error {
  background-color: #f44336;
}
hr {
  position: absolute;
  bottom: 0;
  left: 0;
  border: rgba(255, 255, 255, 0.5) solid 4px;
  border-bottom: 8px;
  width: 100%;
  animation: progress-animation v-bind(animationDuration) 1.5s linear forwards;
}

@keyframes progress-animation {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>
