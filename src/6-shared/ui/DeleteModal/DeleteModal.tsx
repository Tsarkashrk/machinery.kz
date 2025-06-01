'use client'

import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/6-shared/ui/Modal/Modal'
import { Trash2 } from 'lucide-react'
import Button from '@/6-shared/ui/Buttons/Button'
import { Title } from '@/6-shared/ui/Title/Title'
import TextMuted from '../TextMuted/TextMuted'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  itemName: string | undefined
  entityName: string | undefined
  size?: 'sm' | 'md' | 'lg'
}

export const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading = false, itemName, entityName, size = 'md' }: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} closeOnOverlayClick={!isLoading}>
      <ModalHeader>
        <Title fontFamily='geist' size="h2">Удалить {entityName}</Title>
      </ModalHeader>

      <ModalContent>
        <div className="modal__inside" style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              fontSize: '16px',
            }}>
            <Trash2 size={50} style={{ color: '#ef4444' }} />
          </div>
          <div className="modal__text">
            <p className="modal__subtitle">Вы уверены, что хотите удалить {itemName}?</p>
            {itemName && <span className='modal__sure'>Это действие нельзя отменить</span>}
          </div>
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
