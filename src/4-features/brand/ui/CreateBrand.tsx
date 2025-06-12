'use client';

import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '@/6-shared/ui/Modal/Modal';
import { ICompanyPostRequest, ICompanyResponse } from '@/5-entities/company';
import { useEffect } from 'react';
import { IBrand, IBrandRequest } from '@/5-entities/brand';
import { Input } from '@/6-shared/ui/Input/Input';
import Label from '@/6-shared/ui/Label/Label';

interface CreateBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IBrand | null;
  onSave: (data: IBrandRequest) => Promise<void>;
  isLoading?: boolean;
}

export const CreateBrandModal = ({
  isOpen,
  onClose,
  item,
  onSave,
  isLoading = false,
}: CreateBrandModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBrandRequest>({});

  useEffect(() => {
    if (item) {
      reset({
        name: item.name || '',
        description: item.description || '',
        file: item.file || '',
        website: item.website || '',
        founded_year: item.founded_year || new Date().getFullYear(),
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: IBrandRequest) => {
    await onSave(data);
    handleClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      reset();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      closeOnOverlayClick={!isLoading}
    >
      <ModalHeader>
        <h2>{item ? 'Редактировать бренд' : 'Создать бренд'}</h2>
      </ModalHeader>

      <ModalContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-form"
          id="company-form"
        >
          <div className="form-grid form-grid--cols-2">
            <div className="form-group">
              <Label>Название бренда</Label>
              <Input
                {...register('name', { required: 'Название обязательно' })}
                disabled={isLoading}
                placeholder="Введите название компании"
              />
              {errors.name && (
                <div className="form-error">{errors.name.message}</div>
              )}
            </div>

            <div className="form-group">
              <Label>Описание</Label>
              <Input
                {...register('description')}
                disabled={isLoading}
                placeholder="Введите адрес"
              />
            </div>

            <div className="form-group">
              <Label>Изображение</Label>
              <Input
                {...register('file')}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <Label>Веб-сайт</Label>
              <Input
                {...register('website')}
                disabled={isLoading}
                placeholder="https://company.com"
              />
            </div>
          </div>

          <div className="form-group">
            <Label>Год основания</Label>
            <Input
              type="number"
              {...register('founded_year', {
                max: {
                  value: new Date().getFullYear(),
                  message: 'Год не может быть в будущем',
                },
              })}
              disabled={isLoading}
              placeholder="2023"
            />
            {errors.founded_year && (
              <div className="form-error">{errors.founded_year.message}</div>
            )}
          </div>
        </form>
      </ModalContent>

      <ModalFooter>
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          className="modal-btn modal-btn--outline"
        >
          Отмена
        </button>
        <button
          type="submit"
          form="company-form"
          disabled={isLoading}
          className="modal-btn modal-btn--primary"
        >
          {isLoading ? 'Создание...' : 'Создать'}
        </button>
      </ModalFooter>
    </Modal>
  );
};
