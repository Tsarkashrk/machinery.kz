import { IChatMessage, IChatResponse } from '@/5-entities/chat';
import { useGetRental, useRespondRental } from '@/5-entities/rental';
import { useCancelRental } from '@/5-entities/rental/hooks/useCancelRental';
import { useProfile } from '@/5-entities/user';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { formatTime } from '@/6-shared/lib/utils';
import Avatar from '@/6-shared/ui/Avatar/Avatar';
import Button from '@/6-shared/ui/Buttons/Button';
import { Description } from '@/6-shared/ui/Description/Description';
import { Wifi, WifiOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
  const {
    rentalTransaction,
    isLoading,
    error: rentalError,
  } = useGetRental(transactionId ?? 0);

  const [transactionStatus, setTransactionStatus] = useState(
    rentalTransaction?.status,
  );

  useEffect(() => {
    if (rentalTransaction?.status) {
      setTransactionStatus(rentalTransaction.status);
    }
  }, [rentalTransaction?.status]);

  const {
    mutate: rejectMutate,
    isPending: isRejectPending,
    error: rejectError,
  } = useCancelRental();

  console.log(rentalTransaction);

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
          setTransactionStatus('approved');
          console.log('Успешно подтвержден:', data);
        },
        onError: (error) => {
          console.error('Approve error:', error);
        },
      },
    );
  };

  const handleReject = () => {
    if (!transactionId) {
      console.error('No transaction ID found');
      return;
    }

    if (!isOwner) {
      console.error('User is not the owner/dealer');
      return;
    }

    rejectMutate(transactionId, {
      onSuccess: (data) => {
        setTransactionStatus('rejected');
        console.log('Успешно отклонен:', data);
      },
      onError: (error) => {
        console.error('Approve error:', error);
      },
    });
  };

  console.log(transactionStatus)

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
        {isOwner &&
          transactionId &&
          rentalTransaction &&
          transactionStatus === 'requested' && (
            <div className="chat-header__actions">
              Подтвердить транзакцию?
              <Button
                onClick={handleApprove}
                isLoading={isPending}
                disabled={!transactionId}
              >
                Подтвердить
              </Button>
              <Button
                variant="secondary"
                onClick={handleReject}
                isLoading={isRejectPending}
                disabled={!transactionId}
              >
                Отклонить
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};
