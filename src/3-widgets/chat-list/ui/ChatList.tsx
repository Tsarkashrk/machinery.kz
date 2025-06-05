import { ChatItem } from "@/3-widgets/chat-item";
import { IChatsResponse } from "@/5-entities/chat";

type Props = {
  onChatSelect?: (chatId: number) => void;
  activeChatId?: number | null;
  chatList: IChatsResponse;
  isLoading: boolean;
  error: Error | null;
};

export const ChatList = ({
  onChatSelect,
  activeChatId,
  chatList,
  isLoading,
  error,
}: Props) => {
  return (
    <div className="chat-list">
      <div className="chat-list__wrapper">
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}

        {error && (
          <div className="chat-list__empty">
            <div className="chat-list__message">Ошибка загрузки чатов</div>
          </div>
        )}

        {!chatList ||
          (chatList.count === 0 && (
            <div className="chat-list__empty">
              <div className="chat-list__message">Нет активных чатов</div>
            </div>
          ))}

        {chatList &&
          chatList.results &&
          chatList.results.map((chat: any, index: number) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={activeChatId === chat.id}
              onClick={(chatId) => onChatSelect?.(chatId)}
            />
          ))}
      </div>
    </div>
  );
};
