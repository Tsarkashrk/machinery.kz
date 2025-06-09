import { useProfile } from '@/5-entities/user';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { formatTime } from '@/6-shared/lib/utils';
import Avatar from '@/6-shared/ui/Avatar/Avatar';
import Button from '@/6-shared/ui/Buttons/Button';
import { Description } from '@/6-shared/ui/Description/Description';
import { Wifi, WifiOff } from 'lucide-react';
import { useMemo } from 'react';

type Props = {
  username?: string;
  isOnline?: boolean;
  isReconnecting?: boolean;
  avatar: string;
  link: number;
  chat: any;
  timestamp?: string;
};

export const ChatHeader = ({
  chat,
  link,
  avatar,
  username,
  isOnline,
  isReconnecting,
  timestamp,
}: Props) => {
  const { profile } = useProfile();

  console.log(chat);

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

  const handleApprove = () => {

  }

  return (
    <div className="chat-header">
      <div className="chat-header__wrapper">
        <div className="chat-header__info">
          <Avatar
            size="big"
            username={interlocutorChat.username}
            link={`${PLATFORM_PAGES.DEALERS}/${link}`}
          />
          <div className="chat-header__status">
            <h3 className="chat-header__username">
              {interlocutorChat.username}
            </h3>
            <div className="chat-header__status">
              {
                isReconnecting && (
                  <span className="text-yellow-500 text-sm">
                    переподключение...
                  </span>
                )

                // : isOnline ? <span className="text-green-500 text-sm">в сети</span> : <span className="text-gray-500 text-sm">не в сети</span>
              }
              {timestamp && <Description>{formatTime(timestamp)}</Description>}
            </div>
          </div>
        </div>
        <div className="chat-header__actions">
          Подтвердить транзакцию? 
          <Button onClick={handleApprove}>Подтвердить</Button>
        </div>
      </div>
    </div>
  );
};
