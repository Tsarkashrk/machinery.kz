import { useState } from 'react';
import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import { Input } from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Label from '../Label/Label';
import InputFile from '../Input/InputFile';
import { useForm } from 'react-hook-form';

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
  const t = useTranslations();

  const onSubmit = () => {
    const data = {
      confirmation_code: isOwner ? '' : confirmationCode,
      equipment_condition_notes: conditionNotes,
      pickup_photos: photos,
    };

    onConfirm(data);
  };

  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{ marginBottom: '2rem' }}>
          <Title size="h2">Подтвердить получение</Title>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isOwner && (
            <>
              <div className="form-group">
                <Label>Код подтверждения</Label>
                <Input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                  placeholder="Введите код подтверждения"
                />
              </div>
              <div className="form-group">
                <Label forElement="equipment_condition_notes">
                  Заметки о состоянии
                </Label>
                <Textarea
                  id="equipment_condition_notes"
                  placeholder={t('equipment-description-placeholder')}
                  {...register('description')}
                />
              </div>

              <div className="form-group">
                <Label>Фото</Label>
                <InputFile {...register('file')} />
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
