import { ChatItem } from '@/3-widgets/chat-item'
import { IChatsResponse } from '@/5-entities/chat'

type Props = {
  onChatSelect?: (chatId: number) => void
  activeChatId?: number | null
  chatList: IChatsResponse
  isLoading: boolean
  error: Error | null
}

export const ChatList = ({ onChatSelect, activeChatId, chatList, isLoading, error }: Props) => {

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-500">Ошибка загрузки чатов</div>
  }

  if (!chatList || chatList.count === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Нет активных чатов</div>
  }

  return (
    <div className="chat-list">
      <div className="chat-list__wrapper">
        {chatList.results.map((chat: any, index: number) => (
          <ChatItem key={chat.id} chat={chat} isActive={activeChatId === chat.id} onClick={(chatId) => onChatSelect?.(chatId)} />
        ))}
      </div>
    </div>
  )
}
