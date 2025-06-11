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
  // const t = useTranslations('Rental');

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Title
          size="h3"
          fontWeight="700"
        >
          Отменить аренду
        </Title>

        <div className="modal-actions">
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Продолжить аренду
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Отменить аренду
          </Button>
        </div>
      </div>
    </div>
  );
};
