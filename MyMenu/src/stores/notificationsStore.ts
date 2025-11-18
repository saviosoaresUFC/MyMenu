import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Status = 'success' | 'error'

export interface Notification {
  id: number
  message: string
  type: Status
  read: boolean
}

let nextId = 1

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])

  const unreadNotifications = computed(() => notifications.value.filter((n) => !n.read))

  const addNotification = (message: string, type: Status) => {
    notifications.value.push({ id: nextId++, message, type, read: false })
  }

  const addSuccess = (message: string) => {
    addNotification(message, 'success')
  }

  const addError = (message: string) => {
    addNotification(message, 'error')
  }

  const markAsRead = (id: number) => {
    const notification = notifications.value.find((n) => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  return { notifications, unreadNotifications, addError, addSuccess, markAsRead }
})
