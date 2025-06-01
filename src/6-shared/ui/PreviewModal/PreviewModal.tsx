'use client'

import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/6-shared/ui/Modal/Modal'
import Button from '../Buttons/Button'

type FieldType = 'text' | 'textarea' | 'file' | 'select' | 'image' | 'images' | 'image_url'

interface FieldConfig {
  name: string
  label: string
  type: FieldType
  options?: { label: string; value: string | number }[]
  render?: (item: any) => React.ReactNode
}

interface PreviewModalProps<T = any> {
  isOpen: boolean
  onClose: () => void
  item: T | null
  title: string
  fields: FieldConfig[]
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const PreviewModal = <T extends Record<string, any>>({ isOpen, onClose, item, title, fields, size = 'lg' }: PreviewModalProps<T>) => {
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  }

  const renderFieldValue = (field: FieldConfig, value: any) => {
    if (field.render && item) {
      return field.render(item)
    }

    if (value === null || value === undefined || value === '') {
      return <span className="preview-empty">Не указано</span>
    }

    switch (field.type) {
      case 'image_url':
        return (
          <div className="preview-image">
            <img src={value} alt={field.label} className="preview-image__img" />
          </div>
        )
      case 'file':
        return (
          <div className="preview-image">
            <img src={value} alt={field.label} className="preview-image__img" />
          </div>
        )

      case 'images':
        if (!Array.isArray(value) || value.length === 0) {
          return <span className="preview-empty">Изображения не загружены</span>
        }
        return (
          <div className="preview-images">
            {value.map((imageObj, index) => (
              <div key={imageObj.id || index} className="preview-image-item">
                <img src={imageObj.image_url} alt={`${field.label} ${index + 1}`} className="preview-image__img preview-image__small" />
                <div className="preview-image-info">
                  <span className="preview-image-type">{imageObj.image_type}</span>
                  <span className="preview-image-date">{new Date(imageObj.uploaded_at).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            ))}
          </div>
        )
      case 'select':
        const option = field.options?.find((opt) => opt.value === value)
        return <span>{option?.label || value}</span>

      case 'textarea':
        return (
          <div className="preview-textarea">
            {String(value)
              .split('\n')
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
        )

      default:
        return <span>{String(value)}</span>
    }
  }

  const renderField = (field: FieldConfig) => {
    if (!item) return null

    const value = getNestedValue(item, field.name)

    return (
      <div key={field.name} className="preview-field">
        <label className="preview-field__label">{field.label}:</label>
        <div className="preview-field__value">{renderFieldValue(field, value)}</div>
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} closeOnOverlayClick={true}>
      <ModalHeader>
        <h2>Просмотр {title}</h2>
      </ModalHeader>

      <ModalContent>
        <div className="preview-content">
          <div className="preview-grid">{fields.map(renderField)}</div>
        </div>
      </ModalContent>

      <ModalFooter>
        <Button variant="outlined" onClick={onClose}>
          Закрыть
        </Button>
      </ModalFooter>
    </Modal>
  )
}
