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
import { ReturnConfirmationModal } from '@/6-shared/ui/ReportConfirmationModal/ReportConfirmationModal';

type Props = {
  available_for_rent: boolean;
  daily_rental_rate: string;
  purchase_price: string;
  name: string;
  id: number;
  image?: string;
  variant?: 'wide';
  status?: string;
  ownerId: number;
  city: string;
  transactionProcess: string;
  address: string;
  renter: IUser;
  tab: string;
  equipment: any;
  transaction: any;
};

export const TransactionCard = ({
  available_for_rent,
  daily_rental_rate,
  transactionProcess,
  purchase_price,
  renter,
  name,
  id,
  image,
  tab,
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

  const { profile } = useProfile();

  const t = useTranslations('Button');
  const tBadge = useTranslations('Badge');

  const listingType = available_for_rent ? 'rent' : 'sell';
  const transactionPrice =
    listingType === 'rent' ? daily_rental_rate : purchase_price;

  const interlocutorId = tab === 'listings' ? renter.id : equipment.owner;
  const isOwner = equipment.owner === profile?.id;

  console.log(isOwner);

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
    } else if (transactionProcess === 'cancelled ') {
      setStatusState('Отменен');
      setColorState('orange');
    } else if (transactionProcess === 'disputed') {
      setStatusState('Оспорен');
      setColorState('gray');
    }
  }, [status]);

  const confirmPickupMutation = useConfirmPickup();
  const confirmReturnMutation = useConfirmReturn();
  const reportIssueMutation = useReportIssue();
  const cancelRentalMutation = useCancelRental();

  const handlePickupConfirmation = (data: any) => {
    confirmPickupMutation.mutate(
      { id: transaction.id, data },
      {
        onSuccess: () => {
          setShowPickupModal(false);
          window.location.reload();
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
          window.location.reload();
        },
      },
    );
  };

  const handleReportIssue = (data: any) => {
    reportIssueMutation.mutate(
      { id: transaction.id, data },
      {
        onSuccess: () => {
          setShowIssueModal(false);
          window.location.reload();
        },
      },
    );
  };

  const handleCancelRental = () => {
    cancelRentalMutation.mutate(transaction.id, {
      onSuccess: () => {
        setShowCancelModal(false);
        window.location.reload();
      },
    });
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
            <p className="start">
              Начало аренды:{' '}
              {new Date(transaction.start_date).toLocaleDateString('ru-RU')}
            </p>
            <p className="end">
              Конец аренды:{' '}
              {new Date(transaction.end_date).toLocaleDateString('ru-RU')}
            </p>
            <div className="transaction-button">
              {transactionProcess === 'approved' && (
                <Button
                  variant="secondary"
                  onClick={() => setShowPickupModal(true)}
                >
                  Подтвердить получение
                </Button>
              )}
              {transactionProcess === 'in_progress' && (
                <Button
                  variant="secondary"
                  onClick={() => setShowReturnModal(true)}
                >
                  Подтвердить получение
                </Button>
              )}
              {transactionProcess === 'in_progress' && (
                <Button
                  variant="secondary"
                  onClick={() => setShowIssueModal(true)}
                >
                  Report issue
                </Button>
              )}
              {transactionProcess === 'disputed' && (
                <Button
                  variant="secondary"
                  onClick={() => setShowIssueModal(true)}
                >
                  Report issue
                </Button>
              )}
              {(transactionProcess === 'requested' ||
                transactionProcess === 'approved') && (
                <Button
                  variant="secondary"
                  onClick={() => setShowIssueModal(true)}
                >
                  Report issue
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
    </div>
  );
};
