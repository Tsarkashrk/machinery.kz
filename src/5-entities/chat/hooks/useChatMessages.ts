import { useState, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IChatMessage } from "@/5-entities/chat";
import { useWebSocket } from "./useWebSocket";
import { chatApi } from "@/6-shared/api/chats.api";
import { toast } from "sonner";

export const useChatMessages = (chatId: number) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set());
  const [isSending, setIsSending] = useState(false);
  const queryClient = useQueryClient();

  const handleNewMessage = useCallback(
    (message: IChatMessage) => {
      if (!message || !message.id) {
        console.warn("Invalid message received:", message);
        return;
      }

      console.log("handleNewMessage called with:", message);

      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg && msg.id && msg.id === message.id,
        );
        if (exists) {
          console.log("Message already exists, skipping:", message.id);
          return prev;
        }

        console.log("Adding new message to state:", message.id);
        return [...prev, message];
      });

      queryClient.invalidateQueries({ queryKey: [`chat-${chatId}`] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    [chatId, queryClient],
  );

  const handleTyping = useCallback(
    (data: { user_id: number; is_typing: boolean }) => {
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
    [],
  );

  const handleMessageRead = useCallback((data: { message_id: number }) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg && msg.id && msg.id === data.message_id
          ? { ...msg, is_read: true }
          : msg,
      ),
    );
  }, []);

  const handleError = useCallback((error: string) => {
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

      console.log("useChatMessages sendMessage called with:", content);
      setIsSending(true);

      try {
        const messageData = {
          chat: chatId,
          content: content.trim(),
          is_read: false,
        };

        console.log("Sending HTTP request to create message:", messageData);
        const response = await chatApi.sendMessage(chatId, messageData);
        console.log("Message created successfully:", response);

        if (response) {
          handleNewMessage(response);
        }

        const wsNotification = {
          type: "message_sent",
          data: {
            chat_id: chatId,
            message_id: response?.id,
          },
        };

        console.log("Sending WebSocket notification:", wsNotification);
        wsSendMessage(wsNotification);
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message");
      } finally {
        setIsSending(false);
      }
    },
    [wsSendMessage, chatId, isSending, handleNewMessage],
  );

  useEffect(() => {
    const cachedData = queryClient.getQueryData<any>([`chat-${chatId}`]);
    if (cachedData?.messages) {
      const validMessages = cachedData.messages.filter(
        (msg: any) => msg && msg.id,
      );
      setMessages(validMessages);
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
