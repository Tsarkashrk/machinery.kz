import { useState } from 'react';
import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import { Input } from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Label from '../Label/Label';

interface Props {
  isOwner: boolean;
  onConfirm: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const PickupConfirmationModal = ({
  isOwner,
  onConfirm,
  onClose,
  isLoading,
}: Props) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [conditionNotes, setConditionNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const t = useTranslations('Rental');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      confirmation_code: isOwner ? '' : confirmationCode,
      equipment_condition_notes: conditionNotes,
      pickup_photos: photos,
    };

    onConfirm(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Title size="h4">{t('confirmPickup')}</Title>

        <form onSubmit={handleSubmit}>
          {!isOwner && (
            <>
              <div className="form-group">
                <Label>{t('confirmationCode')}</Label>
                <Input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                  placeholder={t('enterConfirmationCode')}
                />
              </div>
              <div className="form-group">
                <Label>{t('equipmentCondition')}</Label>
                <Textarea
                  value={conditionNotes}
                  onChange={(e) => setConditionNotes(e.target.value)}
                  placeholder={t('equipmentConditionPlaceholder')}
                  rows={4}
                />
              </div>

              <div className="form-group">
                <Label>{t('pickupPhotos')}</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    // Handle file upload logic here
                    // Convert files to URLs and set to photos state
                  }}
                />
              </div>
            </>
          )}
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
            >
              {isLoading ? t('confirming') : t('confirm')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
