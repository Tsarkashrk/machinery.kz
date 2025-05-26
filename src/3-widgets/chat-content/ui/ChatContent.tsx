import { ChatHeader } from '@/3-widgets/chat-header'
import { ChatMessage, IChatMessage, IChatMessageRequest, useChatById } from '@/5-entities/chat'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import { Title } from '@/6-shared/ui/Title/Title'
import { ArrowUpCircle, Wifi, WifiOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChatMessages } from '@/5-entities/chat/hooks/useChatMessages'
import { useEffect, useRef, useState } from 'react'

type Props = {
  activeChat: number
}

export const ChatContent = ({ activeChat }: Props) => {
  const { data } = useChatById(activeChat)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const { messages, typingUsers, isConnected, isReconnecting, sendMessage, sendTyping, markMessageRead } = useChatMessages(activeChat)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IChatMessageRequest>({ mode: 'onChange' })

  const messageContent = watch('content')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (messageContent && messageContent.length > 0) {
      if (!isTyping) {
        setIsTyping(true)
        sendTyping(true)
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        sendTyping(false)
      }, 1000)
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [messageContent, isTyping, sendTyping])

  const onSubmit = (data: IChatMessageRequest) => {
    if (data.content.trim()) {
      sendMessage(data.content.trim())
      reset()
      setIsTyping(false)
      sendTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  if (!activeChat) {
    return (
      <div className="chat-content">
        <div className="chat-content__wrapper">Выберите чат</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="chat-content">
        <div className="chat-content__wrapper">Чат не найден</div>
      </div>
    )
  }

  const allMessages = [...(data.messages || []), ...messages].filter((msg, index, arr) => arr.findIndex((m) => m.id === msg.id) === index).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  return (
    <div className="chat-content">
      <div className="chat-content__wrapper">
        <ChatHeader username={data.dealer_details.username} isOnline={isConnected} isReconnecting={isReconnecting} />

        <div className="chat-content__main">
          {allMessages.length === 0 ? (
            <div className="chat-content__start">
              <Title>Начните общение</Title>
            </div>
          ) : (
            <div className="chat-content__messages">
              {allMessages.map((message: IChatMessage) => (
                <ChatMessage key={message.id} message={message} />
              ))}

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
            <Input {...register('content', { required: true })} placeholder="Введите сообщение..." onKeyPress={handleKeyPress} disabled={!isConnected}>
              <Button type="submit" variant="rounded">
                <ArrowUpCircle size={22} />
              </Button>
            </Input>
          </form>

          <div className="connection-status">
            {isReconnecting ? (
              <div className="flex items-center text-yellow-500">
                <WifiOff size={16} className="mr-1" />
                <span className="text-sm">Переподключение...</span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center text-green-500">
                <Wifi size={16} className="mr-1" />
                <span className="text-sm">Подключено</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <WifiOff size={16} className="mr-1" />
                <span className="text-sm">Не подключено</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
