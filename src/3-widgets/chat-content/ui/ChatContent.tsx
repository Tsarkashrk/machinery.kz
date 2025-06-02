import { ChatHeader } from '@/3-widgets/chat-header'
import { ChatMessage, IChatMessage, IChatMessageRequest, useChatById } from '@/5-entities/chat'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import { Title } from '@/6-shared/ui/Title/Title'
import { ArrowUpCircle, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChatMessages } from '@/5-entities/chat/hooks/useChatMessages'
import { useEffect, useRef, useState } from 'react'

type Props = {
  activeChat: number
  chatList: any
}

export const ChatContent = ({ activeChat, chatList }: Props) => {
  const { data } = useChatById(activeChat)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const chat = chatList?.results.find((chat: any) => chat.id === activeChat) || null

  const { messages, typingUsers, isConnected, isReconnecting, isSending, sendMessage, sendTyping, markMessageRead } = useChatMessages(activeChat)

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

  const onSubmit = async (data: IChatMessageRequest) => {
    console.log('Form submitted with data:', data)
    if (data.content && data.content.trim()) {
      console.log('Sending message:', data.content.trim())
      await sendMessage(data.content.trim())
      reset()
      setIsTyping(false)
      sendTyping(false)
    } else {
      console.warn('Empty message content')
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
        <div className="chat-content__wrapper">
          <div className="chat-content__empty">
            <div className="chat-content__message">Выберите чат</div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="chat-content">
        <div className="chat-content__wrapper">
          <div className="chat-content__empty">
            <div className="chat-content__message">Чат не найден</div>
          </div>
        </div>
      </div>
    )
  }

  const allMessages = [...(data.messages || []), ...messages]
    .filter((message) => message && message.id)
    .reduce((acc, message) => {
      if (!message || !message.id) return acc

      if (!acc.some((msg) => msg && msg.id && msg.id === message.id)) {
        acc.push(message)
      }
      return acc
    }, [] as IChatMessage[])
    .sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      }
      return (a.id || 0) - (b.id || 0)
    })

  return (
    <div className="chat-content">
      <div className="chat-content__wrapper">
        <ChatHeader timestamp={chat && chat.last_message ? chat.last_message.timestamp : undefined} chat={chat} link={data.dealer_details.id} username={data.dealer_details.username} avatar={data.dealer_details.image_url} isOnline={isConnected} isReconnecting={isReconnecting} />

        <div className="chat-content__main">
          {allMessages.length === 0 ? (
            <div className="chat-content__start">
              <Title>Начните общение</Title>
            </div>
          ) : (
            <div className="chat-content__messages">
              {allMessages.map((message: IChatMessage) => {
                if (!message || !message.id) {
                  console.warn('Invalid message found:', message)
                  return null
                }

                return <ChatMessage key={`message-${message.id}`} message={message} />
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
            <Input {...register('content', { required: true })} placeholder="Введите сообщение..." onKeyPress={handleKeyPress} disabled={!isConnected || isSending}>
              <Button type="submit" variant="rounded">
                {isSending ? <Loader2 size={22} className="animate-spin" /> : <ArrowUpCircle size={22} />}
              </Button>
            </Input>
          </form>
        </div>
      </div>
    </div>
  )
}
