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
  const { data, isLoading: isChatLoading } = useChatById(activeChat);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const prevMessagesLengthRef = useRef(0);

  const chat =
    chatList?.results?.find((chat: any) => chat.id === activeChat) || null;

  const {
    messages: wsMessages,
    isConnected,
    isReconnecting,
    isSending,
    sendMessage,
  } = useChatMessages(activeChat);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IChatMessageRequest>({ mode: 'onChange' });

  const messageContent = watch('content');

  const allMessages = useMemo(() => {
    if (!data?.messages) return [];

    return data.messages
      .filter((message: IChatMessage) => message && message.id)
      .sort((a: IChatMessage, b: IChatMessage) => {
        if (a.created_at && b.created_at) {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
        return (a.id || 0) - (b.id || 0);
      });
  }, [data?.messages]);

  useEffect(() => {
    const currentLength = allMessages.length;
    
    if (currentLength > prevMessagesLengthRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    prevMessagesLengthRef.current = currentLength;
  }, [allMessages.length]);

  useEffect(() => {
    if (allMessages.length > 0 && messagesEndRef.current && !isChatLoading) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, [activeChat, isChatLoading]);

  const onSubmit = async (data: IChatMessageRequest) => {
    console.log('Form submitted with data:', data);

    if (data.content && data.content.trim()) {
      console.log('Sending message:', data.content.trim());

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

  if (isChatLoading || !data) {
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
    totalMessages: allMessages.length,
    isConnected,
    isReconnecting,
    lastMessage: allMessages[allMessages.length - 1],
    isChatLoading,
  });

  return (
    <div className="chat-content">
      <div className="chat-content__wrapper">
        <ChatHeader
          chat={data}
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