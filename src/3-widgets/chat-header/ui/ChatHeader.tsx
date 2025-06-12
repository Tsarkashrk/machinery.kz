import { IChatMessage, IChatResponse } from '@/5-entities/chat';
import { useGetPurchase, useRespondPurchase } from '@/5-entities/purchase';
import { useCancelPurchase } from '@/5-entities/purchase/hooks/useCancelPurchase';
import { useGetRental, useRespondRental } from '@/5-entities/rental';
import { useCancelRental } from '@/5-entities/rental/hooks/useCancelRental';
import { useProfile } from '@/5-entities/user';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { formatTime } from '@/6-shared/lib/utils';
import Avatar from '@/6-shared/ui/Avatar/Avatar';
import Button from '@/6-shared/ui/Buttons/Button';
import { Description } from '@/6-shared/ui/Description/Description';
import { useQueryClient } from '@tanstack/react-query';
import { Wifi, WifiOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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

  const buyer = chat?.buyer_details;
  const dealer = chat?.dealer_details;

  const messages = chat?.messages;
  const transactionMessage = messages?.[0];

  const transactionId = transactionMessage?.transaction_id;
  const isOwner = profile?.id === dealer?.id;
  const isPurchaseOwner = profile?.id === dealer?.id;

  const { mutate: mutateRental, isPending: isPendingRental, error: errorRental } = useRespondRental();
  const { mutate: respondPurchase, isPending: isPendingPurchase, error: errorPurchase } = useRespondPurchase();
  
  const {
    rentalTransaction,
    isLoading: isLoadingRental,
    error: rentalError,
  } = useGetRental(transactionId ?? 0);
  
  const { 
    purchaseTransaction, 
    isLoading: isLoadingPurchase, 
    error: purchaseError 
  } = useGetPurchase(transactionId ?? 0);

  const [transactionStatus, setTransactionStatus] = useState(
    rentalTransaction?.status || purchaseTransaction?.status,
  );
  
  const queryClient = useQueryClient();

  useEffect(() => {
    if (rentalTransaction?.status) {
      setTransactionStatus(rentalTransaction.status);
    }
  }, [rentalTransaction?.status]);

  useEffect(() => {
    if (purchaseTransaction?.status) {
      setTransactionStatus(purchaseTransaction.status);
    }
  }, [purchaseTransaction?.status]);

  const {
    mutate: rejectRentalMutate,
    isPending: isRejectRentalPending,
    error: rejectRentalError,
  } = useCancelRental();

  const { 
    mutate: rejectPurchase, 
    isPending: isRejectPurchasePending, 
    error: rejectPurchaseError 
  } = useCancelPurchase();

  if (errorRental || errorPurchase) {
    console.error('Transaction error:', errorRental || errorPurchase);
  }

  const equipmentType =
    chat.equipment_details.available_for_rent ? 'rent' : 'sale';
  
  console.log(equipmentType)

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

    if (equipmentType === 'rent') {
      mutateRental(
        {
          id: transactionId,
          data: {
            action: 'approve',
            response_message: '',
          },
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [`chat-${chat.id}`],
            });
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            console.log('Успешно подтвержден:', data);
          },
          onError: (error) => {
            console.error('Approve error:', error);
          },
        },
      );
    } else {
      respondPurchase(
        {
          id: transactionId,
          data: {
            action: 'approve',
            inspection_period_days: 7,
            response_message: 'approved',
          },
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [`chat-${chat.id}`],
            });
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            console.log('Успешно подтвержден:', data);
          },
          onError: (error) => {
            console.error('Approve error:', error);
          },
        },
      );
    }
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

    if (equipmentType === 'rent') {
      rejectRentalMutate(transactionId, {
        onSuccess: (data) => {
          setTransactionStatus('rejected');
          queryClient.invalidateQueries({
            queryKey: [`chat-${chat.id}`],
          });
          queryClient.invalidateQueries({ queryKey: ['chats'] });
          console.log('Успешно отклонен:', data);
        },
        onError: (error) => {
          console.error('Reject error:', error);
        },
      });
    } else {
      rejectPurchase(transactionId, {
        onSuccess: (data) => {
          setTransactionStatus('rejected');
          queryClient.invalidateQueries({
            queryKey: [`chat-${chat.id}`],
          });
          queryClient.invalidateQueries({ queryKey: ['chats'] });
          console.log('Успешно отклонен:', data);
        },
        onError: (error) => {
          console.error('Reject error:', error);
        },
      });
    }
  };

  // Определяем, нужно ли показывать кнопки транзакции
  const shouldShowTransactionButtons = 
    isOwner && 
    transactionId && 
    transactionStatus === 'requested' && 
    (rentalTransaction || purchaseTransaction);

  const isLoading = isPendingRental || isPendingPurchase;
  const isRejectLoading = isRejectRentalPending || isRejectPurchasePending;

  return (
    <div className="chat-header">
      <div className="chat-header__wrapper">
        <div className="chat-header__info">
          <Avatar
            size="big"
            avatar={interlocutorChat?.image_url}
            link={`${PLATFORM_PAGES.DEALERS}/${link}`}
          />
          <div className="chat-header__status">
            <h3 className="chat-header__username">
              {interlocutorChat?.first_name}{' '}
              {interlocutorChat?.last_name || interlocutorChat?.username}
            </h3>
            <p>
              {interlocutorChat?.user_role === 'user'
                ? 'Пользователь'
                : interlocutorChat?.user_role === 'admin'
                  ? 'Админ'
                  : 'Модератор'}
            </p>
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
        
        {shouldShowTransactionButtons && (
          <div className="chat-header__actions">
            Подтвердить транзакцию?
            <Button
              onClick={handleApprove}
              isLoading={isLoading}
              disabled={!transactionId || isLoading}
            >
              Подтвердить
            </Button>
            <Button
              variant="secondary"
              onClick={handleReject}
              isLoading={isRejectLoading}
              disabled={!transactionId || isRejectLoading}
            >
              Отклонить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};