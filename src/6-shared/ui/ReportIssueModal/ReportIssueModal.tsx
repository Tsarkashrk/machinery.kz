import { useState } from 'react';
import Button from '@/6-shared/ui/Buttons/Button';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import Label from '../Label/Label';
import { Input } from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import { useForm } from 'react-hook-form';
import CustomDropdown from '../Dropdown/Dropdown';
import InputFile from '../Input/InputFile';

interface Props {
  onConfirm: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const ReportIssueModal = ({ onConfirm, onClose, isLoading }: Props) => {
  const [description, setDescription] = useState('');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const t = useTranslations();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const issueTypes = [
    {
      id: 1,
      title: t('equipmentDamage'),
      value: 'equipment-damage',
    },
    {
      id: 2,
      title: t('equipmentMalfunction'),
      value: 'equipment-malfunction',
    },
    {
      id: 3,
      title: t('safetyConcern'),
      value: 'safety-concern',
    },
    {
      id: 4,
      title: t('other'),
      value: 'other',
    },
  ];

  const onSubmit = () => {
    const data = {
      issue_type: '',
      description,
      evidence_urls: evidenceUrls,
    };

    onConfirm(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{maxWidth: '400px'}}>
        <Title
          size="h3"
          fontWeight="700"
        >
          {t('reportIssue')}
        </Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Label>{t('issueType')}</Label>
            <CustomDropdown
              name="issue_type"
              control={control}
              options={issueTypes}
              rules={{ required: t('chooseIssue') }}
            />
          </div>

          <div className="form-group">
            <Label>{t('description')}</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('descriptionPlaceholder')}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <Label>{t('photos')}</Label>
            <InputFile {...register('file')} />
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
              {t('submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
