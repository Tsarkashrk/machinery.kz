'use client'

import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/6-shared/ui/Modal/Modal'
import { Trash2 } from 'lucide-react'
import { ICategory } from '@/5-entities/category'
import { Title } from '@/6-shared/ui/Title/Title'
import Button from '@/6-shared/ui/Buttons/Button'

interface DeleteCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  item: ICategory | null
  onConfirm: () => void
  isLoading?: boolean
}

export const CategoryDeleteModal = ({ isOpen, onClose, item, onConfirm, isLoading = false }: DeleteCategoryModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" closeOnOverlayClick={!isLoading}>
      <ModalHeader>
        <Title size="h3">Удалить категорию</Title>
      </ModalHeader>

      <ModalContent>
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              marginBottom: '1rem',
            }}>
            <Trash2 size={50} style={{ color: '#ef4444' }} />
          </div>
          <p style={{ margin: '1rem 0 0.5rem 0', fontSize: '1.6rem', fontWeight: '500' }}>Вы уверены, что хотите удалить категорию?</p>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '1.4rem' }}>
            <strong>"{item?.name}"</strong>
            <br />
            Это действие нельзя отменить.
          </p>
        </div>
      </ModalContent>

      <ModalFooter className="modal__footer--center">
        <Button variant="outlined" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <Trash2 size={16} />
          {isLoading ? 'Удаление...' : 'Удалить'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
