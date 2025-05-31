'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  className?: string
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, size = 'md', closeOnOverlayClick = true, className = '', children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={closeOnOverlayClick ? onClose : undefined}>
      <div className={`modal modal--${size} ${className}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal__close" type="button" aria-label="Закрыть модальное окно">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}

interface ModalHeaderProps {
  children: ReactNode
  className?: string
}

export const ModalHeader = ({ children, className = '' }: ModalHeaderProps) => <div className={`modal__header ${className}`}>{children}</div>

interface ModalContentProps {
  children: ReactNode
  className?: string
}

export const ModalContent = ({ children, className = '' }: ModalContentProps) => <div className={`modal__content ${className}`}>{children}</div>

interface ModalFooterProps {
  children: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className = '' }: ModalFooterProps) => <div className={`modal__footer ${className}`}>{children}</div>
