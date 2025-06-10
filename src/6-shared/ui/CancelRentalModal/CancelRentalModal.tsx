import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { Description } from '@/6-shared/ui/Description/Description';
import { useTranslations } from 'next-intl';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export const CancelRentalModal = ({ onConfirm, onClose, isLoading }: Props) => {
  const t = useTranslations('Rental');

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Title size="h4">{t('cancelRental')}</Title>
        <Description>{t('cancelRentalConfirmation')}</Description>

        <div className="modal-actions">
          <Button
            variant="outlined"
            onClick={onClose}
          >
            {t('keepRental')}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? t('cancelling') : t('cancelRental')}
          </Button>
        </div>
      </div>
    </div>
  );
};
