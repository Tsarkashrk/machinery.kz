import { IChatResponse } from '@/5-entities/chat';
import { IUser, useProfile } from '@/5-entities/user';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { formatTime } from '@/6-shared/lib/utils';
import Avatar from '@/6-shared/ui/Avatar/Avatar';
import { Description } from '@/6-shared/ui/Description/Description';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import { Title } from '@/6-shared/ui/Title/Title';
import { useMemo } from 'react';

type Props = {
  chat: IChatResponse;
  isActive?: boolean;
  onClick?: (chatId: number) => void;
};

export const ChatItem = ({ chat, isActive, onClick }: Props) => {
  const { profile } = useProfile();

  const buyer = chat.buyer_details;
  const dealer = chat.dealer_details;

  const { myChat, interlocutorChat } = useMemo(() => {
    if (profile?.id === buyer.id) {
      return {
        myChat: { ...buyer },
        interlocutorChat: { ...dealer },
      };
    } else {
      return {
        myChat: { ...dealer },
        interlocutorChat: { ...buyer },
      };
    }
  }, [profile?.id, buyer, dealer]);

  const handleClick = () => {
    if (onClick) {
      onClick(chat.id);
    }
  };

  console.log(interlocutorChat);

  return (
    <div
      className={`chat-item ${isActive && 'chat-item--active'}`}
      onClick={handleClick}
    >
      <div className="chat-item__wrapper">
        <div className="chat-item__avatar">
          <Avatar
            username={interlocutorChat?.username}
            link={`${PLATFORM_PAGES.DEALERS}/${interlocutorChat.id}`}
            avatar={interlocutorChat.image_url}
          />
        </div>

        <div className="chat-item__content">
          <div className="chat-item__header">
            <Title
              size="h4"
              fontWeight="600"
            >
              {interlocutorChat?.first_name}{' '}
              {interlocutorChat?.last_name || interlocutorChat.username}
              {chat.last_message?.created_at && (
                <TextMuted>
                  {formatTime(chat.last_message.created_at)}
                </TextMuted>
              )}
            </Title>
            <div className="chat-item__message">
              {chat.last_message?.content && (
                <Description>{chat.last_message.content}</Description>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
