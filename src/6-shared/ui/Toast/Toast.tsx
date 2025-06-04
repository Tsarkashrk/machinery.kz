'use client'

import { Toaster as Sonner, toast } from 'sonner'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

interface ToastProps {
  title?: string
  description?: string
  action?: React.ReactNode
  cancel?: React.ReactNode
  onDismiss?: () => void
}

export const SuccessToast = ({ title, description, action, onDismiss }: ToastProps) => (
  <div className="toast toast--success">
    <div className="toast__icon">
      <CheckCircle className="toast__icon-svg" />
    </div>
    <div className="toast__content">
      {title && <div className="toast__title">{title}</div>}
      {description && <div className="toast__description">{description}</div>}
      {action && <div className="toast__action">{action}</div>}
    </div>
    {onDismiss && (
      <button className="toast__close" onClick={onDismiss} aria-label="Закрыть">
        <X className="toast__close-icon" />
      </button>
    )}
  </div>
)

export const ErrorToast = ({ title, description, action, onDismiss }: ToastProps) => (
  <div className="toast toast--error">
    <div className="toast__icon">
      <XCircle className="toast__icon-svg" />
    </div>
    <div className="toast__content">
      {title && <div className="toast__title">{title}</div>}
      {description && <div className="toast__description">{description}</div>}
      {action && <div className="toast__action">{action}</div>}
    </div>
    {onDismiss && (
      <button className="toast__close" onClick={onDismiss} aria-label="Закрыть">
        <X className="toast__close-icon" />
      </button>
    )}
  </div>
)

export const WarningToast = ({ title, description, action, onDismiss }: ToastProps) => (
  <div className="toast toast--warning">
    <div className="toast__icon">
      <AlertCircle className="toast__icon-svg" />
    </div>
    <div className="toast__content">
      {title && <div className="toast__title">{title}</div>}
      {description && <div className="toast__description">{description}</div>}
      {action && <div className="toast__action">{action}</div>}
    </div>
    {onDismiss && (
      <button className="toast__close" onClick={onDismiss} aria-label="Закрыть">
        <X className="toast__close-icon" />
      </button>
    )}
  </div>
)

export const InfoToast = ({ title, description, action, onDismiss }: ToastProps) => (
  <div className="toast toast--info">
    <div className="toast__icon">
      <Info className="toast__icon-svg" />
    </div>
    <div className="toast__content">
      {title && <div className="toast__title">{title}</div>}
      {description && <div className="toast__description">{description}</div>}
      {action && <div className="toast__action">{action}</div>}
    </div>
    {onDismiss && (
      <button className="toast__close" onClick={onDismiss} aria-label="Закрыть">
        <X className="toast__close-icon" />
      </button>
    )}
  </div>
)

interface ToasterProps {
  className?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  hotkey?: string[]
  richColors?: boolean
  expand?: boolean
  duration?: number
  gap?: number
  visibleToasts?: number
  closeButton?: boolean
  toastOptions?: {
    className?: string
  }
}

export const Toaster = ({ className, position = 'bottom-right', hotkey = ['altKey', 'KeyT'], richColors = false, expand = false, duration = 4000, gap = 12, visibleToasts = 5, closeButton = false, toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={`toaster ${className || ''}`}
      position={position}
      hotkey={hotkey}
      richColors={richColors}
      expand={expand}
      duration={duration}
      gap={gap}
      visibleToasts={visibleToasts}
      closeButton={closeButton}
      toastOptions={{
        ...toastOptions,
        className: `toast-default ${toastOptions?.className || ''}`,
      }}
      {...props}
    />
  )
}

export const showToast = {
  success: (title: string, description?: string, options?: any) => {
    return toast.custom((t) => <SuccessToast title={title} description={description} onDismiss={() => toast.dismiss(t)} />, options)
  },

  error: (title: string, description?: string, options?: any) => {
    return toast.custom((t) => <ErrorToast title={title} description={description} onDismiss={() => toast.dismiss(t)} />, options)
  },

  warning: (title: string, description?: string, options?: any) => {
    return toast.custom((t) => <WarningToast title={title} description={description} onDismiss={() => toast.dismiss(t)} />, options)
  },

  info: (title: string, description?: string, options?: any) => {
    return toast.custom((t) => <InfoToast title={title} description={description} onDismiss={() => toast.dismiss(t)} />, options)
  },

  withAction: (title: string, description: string, action: React.ReactNode, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const ToastComponent = {
      success: SuccessToast,
      error: ErrorToast,
      warning: WarningToast,
      info: InfoToast,
    }[type]

    return toast.custom((t) => <ToastComponent title={title} description={description} action={action} onDismiss={() => toast.dismiss(t)} />)
  },
}
