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
}

export const ReturnConfirmationModal = ({
  onConfirm,
  onClose,
  isLoading,
}: Props) => {
  const [conditionNotes, setConditionNotes] = useState('');
  const [returnPhotos, setReturnPhotos] = useState<any[]>([]);
  const [damageReported, setDamageReported] = useState(false);
  const [damageDescription, setDamageDescription] = useState('');
  const t = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      equipment_condition_notes: conditionNotes,
      return_photos: returnPhotos,
      damage_reported: damageReported,
      damage_description: damageReported ? damageDescription : '',
    };

    onConfirm(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{maxWidth: '400px'}}>
        <div style={{ marginBottom: '2rem' }}>
          <Title size="h2">{t('confirmReturn')}</Title>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label>{t('equipmentCondition')}</Label>
            <Textarea
              value={conditionNotes}
              onChange={(e) => setConditionNotes(e.target.value)}
              placeholder={t('equipmentConditionPlaceholder')}
              rows={4}
            />
          </div>

          <div className="form-group--horizontal">
            <Label>
              {t('reportDamage')}

              <input
                style={{ marginLeft: '1rem' }}
                type="checkbox"
                checked={damageReported}
                onChange={(e) => setDamageReported(e.target.checked)}
              />
            </Label>
          </div>

          {damageReported && (
            <div className="form-group">
              <Label>{t('damageDescription')}</Label>
              <Textarea
                value={damageDescription}
                onChange={(e) => setDamageDescription(e.target.value)}
                placeholder={t('describeDamage')}
                rows={3}
                required
              />
            </div>
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
