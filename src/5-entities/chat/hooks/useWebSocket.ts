import { useCallback, useEffect, useRef, useState } from 'react'
import { IChatMessage } from '@/5-entities/chat'
import { getAccessToken } from '@/6-shared/api'

interface WebSocketMessage {
  type: 'message' | 'typing' | 'read' | 'error'
  data: any
  chat_id?: number
}

interface UseWebSocketProps {
  chatId?: number
  onMessage?: (message: IChatMessage) => void
  onTyping?: (data: { user_id: number; is_typing: boolean }) => void
  onMessageRead?: (data: { message_id: number }) => void
  onError?: (error: string) => void
}

export const useWebSocket = ({ chatId, onMessage, onTyping, onMessageRead, onError }: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const reconnectAttemptsRef = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      const token = getAccessToken()

      const wsUrl = `ws://194.110.54.189:8084/ws/chat/${chatId}/`

      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setIsReconnecting(false)
        reconnectAttemptsRef.current = 0
      }

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)

          switch (message.type) {
            case 'message':
              onMessage?.(message.data)
              break
            case 'typing':
              onTyping?.(message.data)
              break
            case 'read':
              onMessageRead?.(message.data)
              break
            case 'error':
              onError?.(message.data.message || 'WebSocket error')
              break
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setIsConnected(false)

        if (reconnectAttemptsRef.current < maxReconnectAttempts && !event.wasClean) {
          setIsReconnecting(true)
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1
            connect()
          }, Math.pow(2, reconnectAttemptsRef.current) * 1000)
        }
      }

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        onError?.('Connection error')
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      onError?.('Failed to connect')
    }
  }, [chatId, onMessage, onTyping, onMessageRead, onError])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected')
      wsRef.current = null
    }

    setIsConnected(false)
    setIsReconnecting(false)
  }, [])

  const sendMessage = useCallback(
    (message: any) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(message))
      } else {
        console.warn('WebSocket is not connected')
        onError?.('Connection not available')
      }
    },
    [onError],
  )

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      sendMessage({
        type: 'typing',
        data: { is_typing: isTyping, chat_id: chatId },
      })
    },
    [sendMessage, chatId],
  )

  const markMessageRead = useCallback(
    (messageId: number) => {
      sendMessage({
        type: 'read',
        data: { message_id: messageId, chat_id: chatId },
      })
    },
    [sendMessage, chatId],
  )

  useEffect(() => {
    if (chatId) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [chatId, connect, disconnect])

  return {
    isConnected,
    isReconnecting,
    sendMessage,
    sendTyping,
    markMessageRead,
    connect,
    disconnect,
  }
}
