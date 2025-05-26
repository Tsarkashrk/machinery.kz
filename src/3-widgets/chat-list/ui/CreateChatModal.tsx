import { useState } from 'react'
import { useCreateChat } from '@/shared/hooks/useChat'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'

interface CreateChatModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (chatId: string) => void
}

export const CreateChatModal = ({ isOpen, onClose, onSuccess }: CreateChatModalProps) => {
  const [participantId, setParticipantId] = useState('')
  const createChatMutation = useCreateChat()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!participantId.trim()) return

    createChatMutation.mutate(
      { participant_id: participantId },
      {
        onSuccess: (chat) => {
          onSuccess(chat.id)
          onClose()
          setParticipantId('')
        },
      },
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Создать новый чат</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">ID пользователя</label>
            <Input type="text" value={participantId} onChange={(e: any) => setParticipantId(e.target.value)} placeholder="Введите ID пользователя" required />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={createChatMutation.isPending}>
              Отмена
            </Button>
            <Button type="submit" loading={createChatMutation.isPending} disabled={!participantId.trim()}></Button>
          </div>
        </form>
      </div>
    </div>
  )
}
