import { useState } from 'react';
import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import Label from '../Label/Label';
import Textarea from '../Textarea/Textarea';
import { Star, StarOff } from 'lucide-react'; // Lucide icons

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
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const t = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(reviewerId)

    const data = {
      transaction: transactionId,
      rental_transaction: rentalTransactionId,
      reviewer: reviewerId,
      rating,
      comment,
    };

    onConfirm(data);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || rating);
      stars.push(
        <div
          key={i}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          style={{ cursor: 'pointer' }}
        >
          <Star
            size={50}
            color={isFilled ? '#facc15' : '#d1d5db'} 
            fill={isFilled ? '#facc15' : 'none'}
          />
        </div>,
      );
    }

    return stars;
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        style={{ maxWidth: '400px' }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <Title size="h2">{t('reviewConfirm')}</Title>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label>{t('rating')}</Label>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>{renderStars()}</div>
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
