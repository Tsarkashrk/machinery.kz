import { useState, KeyboardEvent } from 'react'
import { useSendMessage } from '@/shared/hooks/useChat'
import { Input } from '@/6-shared/ui/Input/Input'
import Button from '@/6-shared/ui/Buttons/Button'

interface MessageInputProps {
  chatId: string
  placeholder?: string
}

export const MessageInput = ({ chatId, placeholder = 'Введите сообщение...' }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const sendMessageMutation = useSendMessage(chatId)

  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    sendMessageMutation.mutate(
      { content: trimmedMessage },
      {
        onSuccess: () => {
          setMessage('')
        },
      },
    )
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-2 p-4 border-t border-gray-200 bg-white">
      <div className="flex-1">
        <Input value={message} onChange={(e: any) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholder} disabled={sendMessageMutation.isPending} />
      </div>
      <Button onClick={handleSend} disabled={!message.trim() || sendMessageMutation.isPending} loading={sendMessageMutation.isPending} size="md">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </Button>
    </div>
  )
}
