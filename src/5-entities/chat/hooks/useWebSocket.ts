import { useCallback, useEffect, useRef, useState } from 'react';
import { IChatMessage } from '@/5-entities/chat';
import { getAccessToken } from '@/6-shared/api';

interface WebSocketMessage {
  type: 'message' | 'message_sent' | 'typing' | 'read' | 'error';
  data: any;
  chat_id?: number;
}

interface UseWebSocketProps {
  chatId?: number;
  onMessage?: (message: IChatMessage) => void;
  onTyping?: (data: { user_id: number; is_typing: boolean }) => void;
  onMessageRead?: (data: { message_id: number }) => void;
  onError?: (error: string) => void;
}

export const useWebSocket = ({
  chatId,
  onMessage,
  onTyping,
  onMessageRead,
  onError,
}: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const chatIdRef = useRef<number | undefined>(chatId);

  // Обновляем ref при изменении chatId
  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  const connect = useCallback(() => {
    const currentChatId = chatIdRef.current;
    
    if (!currentChatId) {
      console.log('No chatId provided, skipping WebSocket connection');
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    try {
      const token = getAccessToken();
      if (!token) {
        console.error('No access token available');
        onError?.('Authentication required');
        return;
      }

      const wsUrl = `wss://${process.env.NEXT_PUBLIC_DOMEN_URL}/ws/chat/${currentChatId}/?token=${token}`;
      console.log('Connecting to WebSocket:', wsUrl);

      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected to chat:', currentChatId);
        setIsConnected(true);
        setIsReconnecting(false);
        reconnectAttemptsRef.current = 0;
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log('WebSocket message received:', message);

          // Проверяем, что сообщение относится к текущему чату
          if (message.chat_id && message.chat_id !== currentChatId) {
            console.log('Message for different chat, ignoring:', message.chat_id);
            return;
          }

          switch (message.type) {
            case 'message':
              if (message.data && message.data.id) {
                console.log('Processing new message:', message.data.id);
                onMessage?.(message.data);
              } else {
                console.warn('Invalid message data:', message.data);
              }
              break;
            case 'message_sent':
              console.log('Message sent confirmation:', message.data);
              // Можно добавить дополнительную логику для подтверждения отправки
              break;
            case 'typing':
              if (message.data) {
                console.log('Typing indicator:', message.data);
                onTyping?.(message.data);
              }
              break;
            case 'read':
              if (message.data && message.data.message_id) {
                console.log('Message read:', message.data.message_id);
                onMessageRead?.(message.data);
              }
              break;
            case 'error':
              console.error('WebSocket error message:', message.data);
              onError?.(message.data.message || 'WebSocket error');
              break;
            default:
              console.warn('Unknown WebSocket message type:', message.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error, event.data);
        }
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        setIsConnected(false);

        // Переподключаемся только если соединение было закрыто не намеренно
        if (
          reconnectAttemptsRef.current < maxReconnectAttempts &&
          !event.wasClean &&
          currentChatId === chatIdRef.current // Проверяем, что chatId не изменился
        ) {
          setIsReconnecting(true);
          const delay = Math.min(Math.pow(2, reconnectAttemptsRef.current) * 1000, 30000);
          console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, delay);
        } else {
          setIsReconnecting(false);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError?.('Connection error');
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      onError?.('Failed to connect');
    }
  }, [onMessage, onTyping, onMessageRead, onError]);

  const disconnect = useCallback(() => {
    console.log('Disconnecting WebSocket');
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }

    if (wsRef.current) {
      // Устанавливаем флаг, чтобы не переподключаться
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsReconnecting(false);
    reconnectAttemptsRef.current = 0;
  }, []);

  const sendMessage = useCallback(
    (message: any) => {
      const currentChatId = chatIdRef.current;
      console.log('WebSocket sendMessage called:', { message, chatId: currentChatId });
      
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          const messageToSend = {
            ...message,
            chat_id: currentChatId, // Убеждаемся, что chat_id включен
          };
          const messageString = JSON.stringify(messageToSend);
          console.log('Sending to WebSocket:', messageString);
          wsRef.current.send(messageString);
        } catch (error) {
          console.error('Error sending WebSocket message:', error);
          onError?.('Failed to send message');
        }
      } else {
        console.warn('WebSocket is not connected, state:', wsRef.current?.readyState);
        onError?.('Connection not available');
      }
    },
    [onError],
  );

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      const currentChatId = chatIdRef.current;
      sendMessage({
        type: 'typing',
        data: { is_typing: isTyping, chat_id: currentChatId },
      });
    },
    [sendMessage],
  );

  const markMessageRead = useCallback(
    (messageId: number) => {
      const currentChatId = chatIdRef.current;
      sendMessage({
        type: 'read',
        data: { message_id: messageId, chat_id: currentChatId },
      });
    },
    [sendMessage],
  );

  // Переподключаемся при изменении chatId
  useEffect(() => {
    if (chatId) {
      console.log('ChatId changed, reconnecting WebSocket:', chatId);
      disconnect(); // Сначала отключаемся от предыдущего чата
      
      // Небольшая задержка для полного отключения
      const timer = setTimeout(() => {
        connect();
      }, 100);

      return () => {
        clearTimeout(timer);
        disconnect();
      };
    } else {
      disconnect();
    }
  }, [chatId, connect, disconnect]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isReconnecting,
    sendMessage,
    sendTyping,
    markMessageRead,
    connect,
    disconnect,
  };
};