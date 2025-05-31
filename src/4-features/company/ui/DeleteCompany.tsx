'use client'

import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/6-shared/ui/Modal/Modal'
import { ICompanyResponse } from '@/5-entities/company'
import { Trash2 } from 'lucide-react'

interface DeleteCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: ICompanyResponse | null
  onConfirm: () => void
  isLoading?: boolean
}

export const DeleteCompanyModal = ({ isOpen, onClose, company, onConfirm, isLoading = false }: DeleteCompanyModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnOverlayClick={!isLoading}>
      <ModalHeader>
        <h2>Удалить компанию</h2>
      </ModalHeader>

      <ModalContent>
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              marginBottom: '1rem',
            }}>
            <Trash2 size={24} style={{ color: '#ef4444' }} />
          </div>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '500' }}>Вы уверены, что хотите удалить компанию?</p>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            <strong>"{company?.company_name}"</strong>
            <br />
            Это действие нельзя отменить.
          </p>
        </div>
      </ModalContent>

      <ModalFooter className="modal__footer--center">
        <button type="button" onClick={onClose} disabled={isLoading} className="modal-btn modal-btn--outline">
          Отмена
        </button>
        <button type="button" onClick={onConfirm} disabled={isLoading} className="modal-btn modal-btn--danger">
          <Trash2 size={16} />
          {isLoading ? 'Удаление...' : 'Удалить'}
        </button>
      </ModalFooter>
    </Modal>
  )
}
