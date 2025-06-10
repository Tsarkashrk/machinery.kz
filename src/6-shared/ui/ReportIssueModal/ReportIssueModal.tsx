import { useState } from 'react';
import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import Label from '../Label/Label';
import { Input } from '../Input/Input';
import Textarea from '../Textarea/Textarea';

interface Props {
  onConfirm: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const ReportIssueModal = ({ onConfirm, onClose, isLoading }: Props) => {
  const [issueType, setIssueType] = useState('equipment_damage');
  const [description, setDescription] = useState('');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const t = useTranslations('Rental');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      issue_type: issueType,
      description,
      evidence_urls: evidenceUrls,
    };

    onConfirm(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Title size="h4">Сообщить о проблеме</Title>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label>Тип проблемы</Label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="equipment_damage">Повреждение оборудования</option>
              <option value="equipment_malfunction">
                {t('equipmentMalfunction')}
              </option>
              <option value="safety_concern">{t('safetyConcern')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>

          <div className="form-group">
            <Label>{t('issueDescription')}</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('describeIssue')}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <Label>{t('evidencePhotos')}</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                // Handle file upload logic here
              }}
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
            >
              {isLoading ? t('reporting') : t('reportIssue')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
