import { useState, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IChatMessage } from '@/5-entities/chat';
import { useWebSocket } from './useWebSocket';
import { chatApi } from '@/6-shared/api/chats.api';
import { toast } from 'sonner';

export const useChatMessages = (chatId: number) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set());
  const [isSending, setIsSending] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('Chat ID changed, clearing messages:', chatId);
    setMessages([]);
    setTypingUsers(new Set());
  }, [chatId]);

  const handleNewMessage = useCallback(
    (message: IChatMessage) => {
      if (!message || !message.id) {
        console.warn('Invalid message received:', message);
        return;
      }

      console.log('handleNewMessage called:', {
        messageId: message.id,
        chatId: message.chat,
      });

      if (message.chat && message.chat !== chatId) {
        console.log('Message for different chat, ignoring:', message.chat);
        return;
      }

      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg && msg.id && msg.id === message.id,
        );

        if (messageExists) {
          console.log('Message already exists, skipping:', message.id);
          return prevMessages;
        }

        console.log('Adding new message to state:', message.id);
        const newMessages = [...prevMessages, message].sort((a, b) => {
          if (a.created_at && b.created_at) {
            return (
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
          }
          return (a.id || 0) - (b.id || 0);
        });

        return newMessages;
      });

      queryClient.invalidateQueries({ queryKey: [`chat-${chatId}`] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    [chatId, queryClient],
  );

  const handleTyping = useCallback(
    (data: { user_id: number; is_typing: boolean; chat_id?: number }) => {
      if (data.chat_id && data.chat_id !== chatId) {
        console.log('Typing indicator for different chat, ignoring');
        return;
      }

      console.log('Typing indicator:', data);

      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (data.is_typing) {
          newSet.add(data.user_id);
        } else {
          newSet.delete(data.user_id);
        }
        return newSet;
      });

      if (data.is_typing) {
        setTimeout(() => {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(data.user_id);
            return newSet;
          });
        }, 3000);
      }
    },
    [chatId],
  );

  const handleMessageRead = useCallback(
    (data: { message_id: number; chat_id?: number }) => {
      if (data.chat_id && data.chat_id !== chatId) {
        console.log('Read notification for different chat, ignoring');
        return;
      }

      console.log('Message read:', data.message_id);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg && msg.id && msg.id === data.message_id
            ? { ...msg, is_read: true }
            : msg,
        ),
      );
    },
    [chatId],
  );

  const handleError = useCallback((error: string) => {
    console.error('WebSocket error:', error);
    toast.error(`Chat error: ${error}`);
  }, []);

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
  });

  const sendMessage = useCallback(
    async (content: string) => {
      if (isSending) return;

      console.log('useChatMessages sendMessage called with:', content);
      setIsSending(true);

      try {
        const messageData = {
          chat: chatId,
          content: content.trim(),
          is_read: false,
        };

        console.log('Sending HTTP request to create message:', messageData);
        const response = await chatApi.sendMessage(chatId, messageData);
        console.log('Message created successfully:', response);

        if (response) {
          handleNewMessage(response);
        }
        const wsNotification = {
          type: 'message_sent',
          data: {
            chat_id: chatId,
            message_id: response?.id,
          },
        };

        console.log('Sending WebSocket notification:', wsNotification);
        wsSendMessage(wsNotification);
      } catch (error) {
        console.error('Failed to send message:', error);
        toast.error('Failed to send message');
      } finally {
        setIsSending(false);
      }
    },
    [wsSendMessage, chatId, isSending, handleNewMessage],
  );

  useEffect(() => {
    const cachedData = queryClient.getQueryData<any>([`chat-${chatId}`]);
    if (cachedData?.messages) {
      console.log('Loading cached messages:', cachedData.messages.length);
      const validMessages = cachedData.messages.filter(
        (msg: any) => msg && msg.id,
      );
      setMessages(validMessages);
    } else {
      console.log('No cached messages found for chat:', chatId);
    }
  }, [chatId, queryClient]);

  return {
    messages,
    typingUsers,
    isConnected,
    isReconnecting,
    isSending,
    sendMessage,
    sendTyping,
    markMessageRead,
  };
};
