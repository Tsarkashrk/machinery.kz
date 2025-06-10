import { IChatMessage, IChatResponse } from '@/5-entities/chat';
import { useRespondRental } from '@/5-entities/rental';
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
  chat: IChatResponse;
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

  const buyer = chat.buyer_details;
  const dealer = chat.dealer_details;

  const messages = chat?.messages;
  const transactionMessage = messages?.[0];

  const transactionId = transactionMessage?.transaction_id;
  const isOwner = profile?.id === dealer?.id;

  const { mutate, isPending, error } = useRespondRental();

  if (error) {
    console.error('useRespondRental error:', error);
  }

  const { myChat, interlocutorChat } = useMemo(() => {
    if (profile?.id === buyer?.id) {
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
    if (!transactionId) {
      console.error('No transaction ID found');
      return;
    }

    if (!isOwner) {
      console.error('User is not the owner/dealer');
      return;
    }

    console.log('Calling mutate with:', {
      id: transactionId,
      data: {
        action: 'approve',
        response_message: '',
      },
    });

    mutate(
      {
        id: transactionId,
        data: {
          action: 'approve',
          response_message: '',
        },
      },
      {
        onSuccess: (data) => {
          console.log('Approve success:', data);
        },
        onError: (error) => {
          console.error('Approve error:', error);
        },
      },
    );
  };

  return (
    <div className="chat-header">
      <div className="chat-header__wrapper">
        <div className="chat-header__info">
          <Avatar
            size="big"
            username={interlocutorChat?.username}
            link={`${PLATFORM_PAGES.DEALERS}/${link}`}
          />
          <div className="chat-header__status">
            <h3 className="chat-header__username">
              {interlocutorChat?.username}
            </h3>
            <div className="chat-header__status">
              {isReconnecting && (
                <span className="text-yellow-500 text-sm">
                  переподключение...
                </span>
              )}
              {timestamp && <Description>{formatTime(timestamp)}</Description>}
            </div>
          </div>
        </div>
        {isOwner && transactionId && (
          <div className="chat-header__actions">
            Подтвердить транзакцию?
            <Button
              onClick={handleApprove}
              isLoading={isPending}
              disabled={!transactionId}
            >
              Подтвердить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
