import { ChatHeader } from '@/3-widgets/chat-header';
import {
  ChatMessage,
  IChatMessage,
  IChatMessageRequest,
  useChatById,
} from '@/5-entities/chat';
import { ICON_SIZE } from '@/6-shared/constants/constants';
import Button from '@/6-shared/ui/Buttons/Button';
import { Input } from '@/6-shared/ui/Input/Input';
import { Title } from '@/6-shared/ui/Title/Title';
import { ArrowUpCircle, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useChatMessages } from '@/5-entities/chat/hooks/useChatMessages';
import { useEffect, useRef, useState, useMemo } from 'react';

type Props = {
  activeChat: number;
  chatList: any;
};

export const ChatContent = ({ activeChat, chatList }: Props) => {
  const { data } = useChatById(activeChat);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const chat =
    chatList?.results?.find((chat: any) => chat.id === activeChat) || null;

  const {
    messages,
    typingUsers,
    isConnected,
    isReconnecting,
    isSending,
    sendMessage,
    sendTyping,
    markMessageRead,
  } = useChatMessages(activeChat);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IChatMessageRequest>({ mode: 'onChange' });

  const messageContent = watch('content');

  // Объединяем сообщения из API и WebSocket, убираем дубликаты
  const allMessages = useMemo(() => {
    const combined = [...(data?.messages || []), ...messages]
      .filter((message) => message && message.id) // Фильтруем невалидные сообщения
      .reduce((acc, message) => {
        if (!message || !message.id) return acc;

        // Проверяем, нет ли уже такого сообщения
        const exists = acc.some(
          (msg) => msg && msg.id && msg.id === message.id,
        );
        if (!exists) {
          acc.push(message);
        }
        return acc;
      }, [] as IChatMessage[])
      .sort((a, b) => {
        // Сортируем по timestamp или по id
        if (a.created_at && b.created_at) {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
        return (a.id || 0) - (b.id || 0);
      });

    return combined;
  }, [data?.messages, messages]);

  // Создаем обновленный объект chat с актуальными сообщениями
  const updatedChat = useMemo(() => {
    if (!data) return null;

    return {
      ...data,
      messages: allMessages, // Используем объединенные сообщения
    };
  }, [data, allMessages]);

  // Автоскролл при новых сообщениях
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allMessages]);

  // Обработка индикатора печати
  useEffect(() => {
    if (messageContent && messageContent.trim().length > 0) {
      if (!isTyping) {
        setIsTyping(true);
        sendTyping(true);
      }

      // Очищаем предыдущий таймер
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Устанавливаем новый таймер
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        sendTyping(false);
      }, 1000);
    } else if (isTyping) {
      // Если поле очищено, сразу убираем индикатор печати
      setIsTyping(false);
      sendTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [messageContent, isTyping, sendTyping]);

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (isTyping) {
        sendTyping(false);
      }
    };
  }, [isTyping, sendTyping]);

  const onSubmit = async (data: IChatMessageRequest) => {
    console.log('Form submitted with data:', data);

    if (data.content && data.content.trim()) {
      console.log('Sending message:', data.content.trim());

      // Останавливаем индикатор печати
      if (isTyping) {
        setIsTyping(false);
        sendTyping(false);
      }

      // Очищаем таймер
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      await sendMessage(data.content.trim());
      reset();
    } else {
      console.warn('Empty message content');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  if (!activeChat) {
    return (
      <div className="chat-content">
        <div className="chat-content__wrapper">
          <div className="chat-content__empty">
            <div className="chat-content__message">Выберите чат</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !updatedChat) {
    return (
      <div className="chat-content">
        <div className="chat-content__wrapper">
          <div className="chat-content__empty">
            <div className="chat-content__message">Загрузка чата...</div>
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering messages:', {
    apiMessages: data.messages?.length || 0,
    wsMessages: messages.length,
    totalMessages: allMessages.length,
    isConnected,
    isReconnecting,
    lastMessage: allMessages[allMessages.length - 1],
  });

  return (
    <div className="chat-content">
      <div className="chat-content__wrapper">
        <ChatHeader
          chat={updatedChat}
          link={data.dealer_details.id}
          username={data.dealer_details.username}
          avatar={data.dealer_details.image_url}
          isOnline={isConnected}
          isReconnecting={isReconnecting}
        />

        <div className="chat-content__main">
          {allMessages.length === 0 ? (
            <div className="chat-content__start">
              <Title>Начните общение</Title>
              {!isConnected && (
                <p className="text-sm text-gray-500 mt-2">
                  {isReconnecting ? 'Переподключение...' : 'Нет соединения'}
                </p>
              )}
            </div>
          ) : (
            <div className="chat-content__messages">
              {allMessages.map((message: IChatMessage) => {
                if (!message || !message.id) {
                  console.warn('Invalid message found:', message);
                  return null;
                }

                return (
                  <ChatMessage
                    key={`message-${message.id}`}
                    message={message}
                  />
                );
              })}

              {typingUsers.size > 0 && (
                <div className="chat-content__typing">
                  <div className="typing-indicator">
                    <span>Собеседник печатает</span>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="chat-content__input">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('content', { required: true })}
              placeholder={
                !isConnected
                  ? isReconnecting
                    ? 'Переподключение...'
                    : 'Нет соединения'
                  : 'Введите сообщение...'
              }
              onKeyPress={handleKeyPress}
              disabled={!isConnected || isSending}
            >
              <Button
                type="submit"
                variant="rounded"
                disabled={!isConnected || isSending}
              >
                {isSending ? (
                  <Loader2
                    size={22}
                    className="animate-spin"
                  />
                ) : (
                  <ArrowUpCircle size={22} />
                )}
              </Button>
            </Input>
          </form>
        </div>
      </div>
    </div>
  );
};
