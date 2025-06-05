import { ChatList } from "@/3-widgets/chat-list";
import { ChatContent } from "@/3-widgets/chat-content";
import { useChatsList } from "@/5-entities/chat";
import { useState } from "react";

export const ChatWindow = () => {
  const { chatList, isLoading, error } = useChatsList();

  const [activeChat, setActiveChat] = useState<number>(0);

  return (
    <div className="chat-window">
      <div className="chat-window__wrapper">
        <ChatList
          chatList={chatList}
          isLoading={isLoading}
          error={error}
          activeChatId={activeChat}
          onChatSelect={setActiveChat}
        />
        <ChatContent activeChat={activeChat} chatList={chatList} />
      </div>
    </div>
  );
};
