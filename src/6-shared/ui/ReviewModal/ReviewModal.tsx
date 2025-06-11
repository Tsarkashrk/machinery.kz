import { useState } from 'react';
import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import Label from '../Label/Label';
import Textarea from '../Textarea/Textarea';
import { Input } from '../Input/Input';

interface Props {
  onConfirm: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
  transactionId: any;
  rentalTransactionId: number;
  reviewerId: number;
}

export const ReviewModal = ({
  onConfirm,
  onClose,
  isLoading,
  transactionId,
  rentalTransactionId,
  reviewerId,
}: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const t = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      transaction: transactionId,
      rental_transaction: rentalTransactionId,
      reviewer: reviewerId,
      rating,
      comment,
    };

    onConfirm(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{ marginBottom: '2rem' }}>
          <Title size="h2">{t('reviewConfirm')}</Title>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label>{t('rating')}</Label>
            <Input
              type="number"
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <Label>{t('comment')}</Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('reviewDescription')}
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {t('confirm')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
