'use client'

import { useEffect } from 'react'
import { useForm, Path, FieldValues } from 'react-hook-form'
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/6-shared/ui/Modal/Modal'
import InputFile from '@/6-shared/ui/Input/InputFile'
import Button from '../Buttons/Button'

type FieldType = 'text' | 'textarea' | 'file' | 'select'

interface FieldConfig {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string | number }[]
}

interface EditorModalProps<T extends FieldValues> {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: FormData) => Promise<void>
  isLoading?: boolean
  item?: T | null
  title: string
  defaultValues: T
  fields: FieldConfig[]
}

export const EditorModal = <T extends FieldValues>({ isOpen, onClose, onSave, isLoading = false, item, title, defaultValues, fields }: EditorModalProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>()

  useEffect(() => {
    reset(item ?? defaultValues)
  }, [item, defaultValues, reset])

  const onSubmit = async (data: any) => {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key]
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0])
      } else if (value instanceof File) {
        formData.append(key, value)
      } else if (typeof value !== 'undefined' && value !== null) {
        formData.append(key, String(value))
      }
    }

    await onSave(formData)
    handleClose()
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      reset()
    }
  }

  const renderField = (field: FieldConfig) => {
    const fieldName = field.name as Path<T>
    const commonProps = {
      ...register(fieldName, field.required ? { required: `${field.label} обязательно` } : {}),
      disabled: isLoading,
      className: `form-input ${errors[fieldName] ? 'form-input--error' : ''}`,
      placeholder: field.placeholder,
    }

    return (
      <div key={field.name} className="form-field">
        <label className="form-label">{field.label}</label>
        {field.type === 'text' && <input type="text" {...commonProps} />}
        {field.type === 'textarea' && <textarea {...commonProps} />}
        {field.type === 'file' && <InputFile {...register(fieldName)} />}
        {field.type === 'select' && (
          <select {...commonProps}>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
        {errors[fieldName] && <div className="form-error">{(errors[fieldName] as any)?.message}</div>}
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" closeOnOverlayClick={!isLoading}>
      <ModalHeader>
        <h2>{item ? `Редактировать ${title}` : `Создать ${title}`}</h2>
      </ModalHeader>

      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form" id="editor-form">
          <div className="form-grid form-grid--cols-2">{fields.map(renderField)}</div>
        </form>
      </ModalContent>

      <ModalFooter>
        <Button variant="outlined" onClick={handleClose}>Отмена</Button>
        <Button>{isLoading ? 'Сохранение...' : 'Сохранить'}</Button>
      </ModalFooter>
    </Modal>
  )
}
