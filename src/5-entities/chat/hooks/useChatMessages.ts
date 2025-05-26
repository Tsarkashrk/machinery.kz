import { useState, useCallback, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { IChatMessage } from '@/5-entities/chat'
import { useWebSocket } from './useWebSocket'
import { toast } from 'sonner'

export const useChatMessages = (chatId: number) => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set())
  const queryClient = useQueryClient()

  const handleNewMessage = useCallback(
    (message: IChatMessage) => {
      setMessages((prev) => {
        // Проверяем, нет ли уже такого сообщения
        const exists = prev.some((msg) => msg.id === message.id)
        if (exists) return prev

        return [...prev, message]
      })

      // Обновляем кэш React Query
      queryClient.invalidateQueries({ queryKey: [`chat-${chatId}`] })
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
    [chatId, queryClient],
  )

  const handleTyping = useCallback((data: { user_id: number; is_typing: boolean }) => {
    setTypingUsers((prev) => {
      const newSet = new Set(prev)
      if (data.is_typing) {
        newSet.add(data.user_id)
      } else {
        newSet.delete(data.user_id)
      }
      return newSet
    })

    // Убираем индикатор печати через 3 секунды
    if (data.is_typing) {
      setTimeout(() => {
        setTypingUsers((prev) => {
          const newSet = new Set(prev)
          newSet.delete(data.user_id)
          return newSet
        })
      }, 3000)
    }
  }, [])

  const handleMessageRead = useCallback((data: { message_id: number }) => {
    setMessages((prev) => prev.map((msg) => (msg.id === data.message_id ? { ...msg, is_read: true } : msg)))
  }, [])

  const handleError = useCallback((error: string) => {
    toast.error(`Chat error: ${error}`)
  }, [])

  const {
    isConnected,
    isReconnecting,
    sendMessage: wsSendMessage,
    sendTyping,
    markMessageRead,
  } = useWebSocket({
    chatId,
    onMessage: handleNewMessage,
    onTyping: handleTyping,
    onMessageRead: handleMessageRead,
    onError: handleError,
  })

  const sendMessage = useCallback(
    (content: string) => {
      wsSendMessage({
        type: 'message',
        data: {
          content,
          chat_id: chatId,
        },
      })
    },
    [wsSendMessage, chatId],
  )

  // Инициализация сообщений из кэша React Query
  useEffect(() => {
    const cachedData = queryClient.getQueryData<any>([`chat-${chatId}`])
    if (cachedData?.messages) {
      setMessages(cachedData.messages)
    }
  }, [chatId, queryClient])

  return {
    messages,
    typingUsers,
    isConnected,
    isReconnecting,
    sendMessage,
    sendTyping,
    markMessageRead,
  }
}
