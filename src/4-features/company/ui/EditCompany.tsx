'use client'

import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/6-shared/ui/Modal/Modal'
import { ICompanyEditRequest, ICompanyResponse } from '@/5-entities/company'
import { useEffect } from 'react'
import InputFile from '@/6-shared/ui/Input/InputFile'

interface EditCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: ICompanyResponse | null
  onSave: (data: FormData) => Promise<void>
  isLoading?: boolean
}

export const EditCompanyModal = ({ isOpen, onClose, company, onSave, isLoading = false }: EditCompanyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICompanyEditRequest>({})

  useEffect(() => {
    if (company) {
      reset({
        company_name: company.company_name || '',
        company_address: company.company_address || '',
        company_phone: company.company_phone || '',
        company_email: company.company_email || '',
        website: company.website || '',
        founded_year: company.founded_year || new Date().getFullYear(),
      })
    }
  }, [company, reset])

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData()

      if (data.file && data.file[0]) {
        formData.append('file', data.file[0])
      } else {
        console.warn('Файл не выбран')
      }

      formData.append('company_name', data.company_name)
      formData.append('company_address', data.company_address)
      formData.append('company_phone', data.company_phone)
      formData.append('company_email', data.company_email)
      formData.append('website', data.website)
      formData.append('founded_year', data.founded_year.toString())

      await onSave(formData)
      handleClose()
    } catch (error) {
      console.error('Ошибка при сохранении компании:', error)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      reset()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" closeOnOverlayClick={!isLoading}>
      <ModalHeader>
        <h2>{company ? 'Редактировать компанию' : 'Создать компанию'}</h2>
      </ModalHeader>

      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form" id="company-form">
          <div className="form-grid form-grid--cols-2">
            <div className="form-group">
              <label className="form-label form-label--required">Название компании</label>
              <input {...register('company_name', { required: 'Название обязательно' })} className={`form-input ${errors.company_name ? 'form-input--error' : ''}`} disabled={isLoading} placeholder="Введите название компании" />
              {errors.company_name && <div className="form-error">{errors.company_name.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Адрес</label>
              <input {...register('company_address')} className="form-input" disabled={isLoading} placeholder="Введите адрес" />
            </div>

            <div className="form-group">
              <label className="form-label">Телефон</label>
              <input {...register('company_phone')} className="form-input" disabled={isLoading} placeholder="+7 (xxx) xxx-xx-xx" />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register('company_email', {
                  required: 'Почта обязательна',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Неверный формат email',
                  },
                })}
                className={`form-input ${errors.company_email ? 'form-input--error' : ''}`}
                disabled={isLoading}
                placeholder="company@example.com"
              />
              {errors.company_email && <div className="form-error">{errors.company_email.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Изображение</label>
              <input
                type="file"
                accept="image/*"
                {...register('file', {
                  required: 'Изображение обязательно!',
                  validate: {
                    onlyOne: (value) => value.length === 1 || 'Можно выбрать только 1 файл',
                  },
                })}
                multiple={false}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Веб-сайт</label>
              <input {...register('website')} className="form-input" disabled={isLoading} placeholder="https://company.com" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Год основания</label>
            <input
              type="number"
              {...register('founded_year', {
                max: { value: new Date().getFullYear(), message: 'Год не может быть в будущем' },
              })}
              className={`form-input ${errors.founded_year ? 'form-input--error' : ''}`}
              disabled={isLoading}
              placeholder="2023"
            />
            {errors.founded_year && <div className="form-error">{errors.founded_year.message}</div>}
          </div>
        </form>
      </ModalContent>

      <ModalFooter>
        <button type="button" onClick={handleClose} disabled={isLoading} className="modal-btn modal-btn--outline">
          Отмена
        </button>
        <button type="submit" form="company-form" disabled={isLoading} className="modal-btn modal-btn--primary">
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </ModalFooter>
    </Modal>
  )
}
