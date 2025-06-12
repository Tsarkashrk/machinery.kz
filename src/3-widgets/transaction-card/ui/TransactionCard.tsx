import { ICON_SIZE } from '@/6-shared/constants/constants';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import { MapPin } from 'lucide-react';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { Badge } from '@/6-shared/ui/Badge/Badge';
import Image from 'next/image';
import { ToggleFavoriteButton } from '@/4-features/toggle-favorite';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Title } from '@/6-shared/ui/Title/Title';
import { Description } from '@/6-shared/ui/Description/Description';
import { useFavorites } from '@/5-entities/favorite';
import { useEffect, useState } from 'react';
import { IUser, useProfile, useUserById } from '@/5-entities/user';
import Avatar from '@/6-shared/ui/Avatar/Avatar';
import { formatTime } from '@/6-shared/lib/utils';
import Button from '@/6-shared/ui/Buttons/Button';
import {
  useCancelRental,
  useConfirmPickup,
  useReportIssue,
} from '@/5-entities/rental';
import { PickupConfirmationModal } from '@/6-shared/ui/PickupConfirmationModal/PickupConfirmationModal';
import { useConfirmReturn } from '@/5-entities/rental/hooks/useConfirmReturn';
import { ReportIssueModal } from '@/6-shared/ui/ReportIssueModal/ReportIssueModal';
import { CancelRentalModal } from '@/6-shared/ui/CancelRentalModal/CancelRentalModal';
import { ReturnConfirmationModal } from '@/6-shared/ui/ReturnConfirmationModal/ReturnConfirmationModal';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ReviewModal } from '@/6-shared/ui/ReviewModal/ReviewModal';
import { useReview } from '@/5-entities/review/hooks/useReview';
import { useConfirmPickupPurchase } from '@/5-entities/purchase/hooks/useConfirmPickup';
import { useComplete } from '@/5-entities/purchase';
import { CompleteModal } from '@/6-shared/ui/CompleteModal/CompleteModal';

type Props = {
  available_for_rent: boolean;
  daily_rental_rate: string;
  purchase_price: string;
  transactionType: string;
  name: string;
  id: number;
  image?: string;
  variant?: 'wide';
  status?: string;
  ownerId: number;
  city: string;
  transactionProcess: string;
  address: string;
  renter?: IUser;
  seller?: any;
  buyer?: any;
  tab: string;
  equipment: any;
  transaction: any;
  onTransactionUpdate?: () => void;
};

export const TransactionCard = ({
  available_for_rent,
  daily_rental_rate,
  transactionProcess,
  purchase_price,
  transactionType,
  onTransactionUpdate,
  renter,
  buyer,
  name,
  id,
  image,
  tab,
  seller,
  city,
  equipment,
  transaction,
  address,
  ownerId,
  variant,
  status,
}: Props) => {
  const [statusState, setStatusState] = useState('');
  const [colorState, setColorState] = useState<any>('');

  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPurchasePickupModal, setShowPurchasePickupModal] = useState(false);
  const [showPurchaseCompleteModal, setShowPurchaseCompleteModal] =
    useState(false);

  const { profile } = useProfile();

  const t = useTranslations('Button');
  const tBadge = useTranslations('Badge');

  const listingType = available_for_rent ? 'rent' : 'sell';
  const transactionPrice =
    listingType === 'rent' ? daily_rental_rate : purchase_price;

  const getInterlocutorId = () => {
    if (transactionType === 'rent') {
      if (tab === 'listings') {
        return transaction.renter_details?.id;
      } else {
        return transaction.owner_details?.id;
      }
    } else {
      if (tab === 'listings') {
        return transaction.buyer_details?.id;
      } else {
        return transaction.seller_details?.id;
      }
    }
  };

  const interlocutorId = getInterlocutorId();

  const isOwner =
    transactionType === 'rent'
      ? equipment.owner === profile?.id
      : transaction.seller_details?.id === profile?.id;

  const isRenter =
    transactionType === 'rent' &&
    transaction.renter_details?.id === profile?.id;
  const isBuyer =
    transactionType === 'sale' && transaction.buyer_details?.id === profile?.id;

  const { user } = useUserById(interlocutorId);

  useEffect(() => {
    if (transactionProcess === 'approved') {
      setStatusState('Принят');
      setColorState('green');
    } else if (transactionProcess === 'rejected') {
      setStatusState('Отклонен');
      setColorState('red');
    } else if (transactionProcess === 'requested') {
      setStatusState('Запрошен');
      setColorState('blue');
    } else if (transactionProcess === 'in_progress') {
      setStatusState('В процессе');
      setColorState('purple');
    } else if (transactionProcess === 'completed') {
      setStatusState('Завершен');
      setColorState('green');
    } else if (transactionProcess === 'cancelled') {
      setStatusState('Отменен');
      setColorState('orange');
    } else if (transactionProcess === 'disputed') {
      setStatusState('Оспорен');
      setColorState('gray');
    }
  }, [transactionProcess]);

  const confirmPickupMutation = useConfirmPickup();
  const confirmReviewMutation = useReview();
  const confirmReturnMutation = useConfirmReturn();
  const reportIssueMutation = useReportIssue();
  const cancelRentalMutation = useCancelRental();
  const completePurchaseMutation = useComplete();

  const confirmPurchasePickup = useConfirmPickupPurchase();

  const handleCompletePurchaseConfirm = () => {
    completePurchaseMutation.mutate(
      {
        id: transaction.id,
        data: {
          final_condition_notes: 'ok',
          satisfaction_rating: 5,
        },
      },
      {
        onSuccess: (response) => {
          toast.success('Успешно завершено');
          onTransactionUpdate?.();
        },
        onError: (error) => {
          console.error('Ошибка:', error);
        },
      },
    );
  };

  const handlePickupPurchaseConfirmation = (data: any) => {
    confirmPurchasePickup.mutate(
      { id: transaction.id, data },
      {
        onSuccess: (response) => {
          toast.success('Успешно подтверждено');
          onTransactionUpdate?.();
          setShowPurchasePickupModal(false);
        },
        onError: (error) => {
          console.error('Ошибка:', error);
        },
      },
    );
  };
  const handlePickupConfirmation = (data: any) => {
    confirmPickupMutation.mutate(
      { id: transaction.id, data },
      {
        onSuccess: (response) => {
          toast.success('Успешно подтверждено');
          setShowPickupModal(false);
          onTransactionUpdate?.();
        },
        onError: (error) => {
          console.error('Ошибка:', error);
        },
      },
    );
  };

  const handleReturnConfirmation = (data: any) => {
    confirmReturnMutation.mutate(
      { id: transaction.id, data },
      {
        onSuccess: () => {
          setShowReturnModal(false);
          toast.success('Успешно подтверждено');
          onTransactionUpdate?.();
        },
      },
    );
  };

  const handleReviewRental = (data: any) => {
    confirmReviewMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Успешно оценено');
        setShowReviewModal(false);
        onTransactionUpdate?.();
      },
    });
  };

  const handleReportIssue = (data: any) => {
    reportIssueMutation.mutate(
      { id: transaction.id, data },
      {
        onSuccess: () => {
          setShowIssueModal(false);
          toast.success('Успешно отправлено');
          onTransactionUpdate?.();
        },
      },
    );
  };

  const handleCancelRental = () => {
    cancelRentalMutation.mutate(transaction.id, {
      onSuccess: () => {
        toast.success('Успешно отменено');
        onTransactionUpdate?.();
        setShowCancelModal(false);
      },
    });
  };

  const renderTransactionDates = () => {
    if (transactionType === 'rent') {
      return (
        <>
          <p className="start">
            Начало аренды:{' '}
            {new Date(transaction.start_date).toLocaleDateString('ru-RU')}
          </p>
          <p className="end">
            Конец аренды:{' '}
            {new Date(transaction.end_date).toLocaleDateString('ru-RU')}
          </p>
        </>
      );
    }
  };

  const canRate = () => {
    if (transactionType === 'rent') {
      return transaction.user_can_rate && transactionProcess === 'completed';
    } else {
      return transaction.can_rate && transactionProcess === 'completed';
    }
  };

  const hasUserRated = () => {
    if (transactionType === 'rent') {
      return isOwner ? transaction.owner_rated : transaction.renter_rated;
    } else {
      return isOwner ? transaction.owner_rated : transaction.buyer_rated;
    }
  };

  return (
    <div
      className={`transaction-card ${variant && `transaction-card--${variant}`}`}
    >
      <div className="transaction-card__wrapper">
        <Link
          href={`${PLATFORM_PAGES.PRODUCTS}/${id}`}
          className="transaction-card__image-container"
        >
          <Image
            width={500}
            height={500}
            src={image ? image : `/assets/profile-placeholder.png`}
            className="transaction-card__image"
            alt={'transaction image'}
          />
        </Link>
        <div className="transaction-card__content">
          <div className="transaction-card__left">
            <div className="transaction-card__header">
              <div className="transaction-card__badges">
                <Badge type={listingType === 'rent' ? 'green' : 'red'}>
                  {tBadge(listingType)}
                </Badge>
                {transactionProcess && (
                  <Badge type={colorState}>{statusState}</Badge>
                )}
              </div>
              <Title
                size="h5"
                fontSize="18"
                fontWeight="600"
              >
                {name}
              </Title>
            </div>
            <div className="transaction-card__footer">
              <Description>
                <MapPin
                  fill="true"
                  size={ICON_SIZE}
                />
                {city}, {address}
              </Description>
              <div className="transaction-card__price">
                ₸ {transactionPrice}{' '}
                {listingType === 'rent' && <TextMuted>/ день</TextMuted>}
              </div>
            </div>
          </div>
          <div className="line-vertical" />
          <div className="transaction-card__right">
            <div className="transaction-card__user">
              <Avatar
                avatar={user?.image_url}
                link={`${PLATFORM_PAGES.DEALERS}/${user?.id}`}
              />
              <div className="transaction-card__text">
                <Link href={`${PLATFORM_PAGES.DEALERS}/${user?.id}`}>
                  <Title
                    color="black"
                    size="h4"
                    fontWeight="600"
                  >
                    {user?.first_name} {user?.last_name || user?.email}
                  </Title>
                </Link>
              </div>
            </div>

            {renderTransactionDates()}

            <div className="transaction-button">
              {transactionType === 'rent' && (
                <>
                  {transactionProcess === 'approved' &&
                    transaction.can_confirm_pickup && (
                      <Button
                        variant="secondary"
                        onClick={() => setShowPickupModal(true)}
                      >
                        Подтвердить получение
                      </Button>
                    )}
                  {transactionProcess === 'in_progress' &&
                    transaction.can_confirm_return && (
                      <Button
                        variant="secondary"
                        onClick={() => setShowReturnModal(true)}
                      >
                        Подтвердить возврат
                      </Button>
                    )}
                  {(transactionProcess === 'in_progress' ||
                    transactionProcess === 'disputed') && (
                    <Button
                      variant="secondary"
                      onClick={() => setShowIssueModal(true)}
                    >
                      Сообщить о проблеме
                    </Button>
                  )}
                </>
              )}

              {/* Кнопки для покупки */}
              {transactionType === 'sale' && (
                <>
                  {transactionProcess === 'approved' &&
                    transaction.can_confirm_pickup && (
                      <Button
                        variant="secondary"
                        onClick={() => setShowPurchasePickupModal(true)}
                      >
                        Подтвердить выдачу
                      </Button>
                    )}

                  {isBuyer && transactionProcess === 'in_progress' && (
                    <Button
                      variant="secondary"
                      onClick={() => setShowPurchaseCompleteModal(true)}
                    >
                      Подтвердить получение
                    </Button>
                  )}
                </>
              )}

              {/* Общие кнопки */}
              {(transactionProcess === 'requested' ||
                transactionProcess === 'approved') && (
                <Button
                  variant="secondary"
                  onClick={() => setShowCancelModal(true)}
                >
                  Отменить
                </Button>
              )}

              {canRate() && !hasUserRated() && (
                <Button onClick={() => setShowReviewModal(true)}>
                  Оценить
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPickupModal && (
        <PickupConfirmationModal
          isOwner={isOwner}
          onConfirm={handlePickupConfirmation}
          onClose={() => setShowPickupModal(false)}
          isLoading={confirmPickupMutation.isPending}
        />
      )}

      {showPurchaseCompleteModal && (
        <CompleteModal
          isOwner={isBuyer}
          onConfirm={handleCompletePurchaseConfirm}
          onClose={() => setShowPurchaseCompleteModal(false)}
          isLoading={completePurchaseMutation.isPending}
        />
      )}

      {showPurchasePickupModal && (
        <PickupConfirmationModal
          isOwner={isOwner}
          onConfirm={handlePickupPurchaseConfirmation}
          onClose={() => setShowPurchasePickupModal(false)}
          isLoading={confirmPurchasePickup.isPending}
        />
      )}

      {showReturnModal && (
        <ReturnConfirmationModal
          onConfirm={handleReturnConfirmation}
          onClose={() => setShowReturnModal(false)}
          isLoading={confirmReturnMutation.isPending}
        />
      )}

      {showIssueModal && (
        <ReportIssueModal
          onConfirm={handleReportIssue}
          onClose={() => setShowIssueModal(false)}
          isLoading={reportIssueMutation.isPending}
        />
      )}

      {showCancelModal && (
        <CancelRentalModal
          onConfirm={handleCancelRental}
          onClose={() => setShowCancelModal(false)}
          isLoading={cancelRentalMutation.isPending}
        />
      )}

      {showReviewModal && (
        <ReviewModal
          onConfirm={handleReviewRental}
          onClose={() => setShowReviewModal(false)}
          isLoading={confirmReviewMutation.isPending}
          reviewerId={
            isOwner
              ? transaction.owner_details?.id
              : isRenter
                ? transaction.renter_details?.id
                : isBuyer && transaction.buyer_details?.id
          }
          transactionId={transactionType === 'sale' ? transaction.id : null}
          rentalTransactionId={
            transactionType === 'rent' ? transaction.id : null
          }
        />
      )}
    </div>
  );
};
