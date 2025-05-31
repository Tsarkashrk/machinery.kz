import { forwardRef, InputHTMLAttributes, PropsWithChildren, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  extra?: string
  state?: 'error' | 'success'
  type?: string
  disabled?: boolean
  placeholder?: string
  value?: string
  isNumber?: boolean
  children?: React.ReactNode
  maxWidth?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', placeholder, id, extra, state, disabled, isNumber, children, maxWidth, ...rest }, ref) => {
  return (
    <div className="input" style={{ maxWidth }}>
      <input
        ref={ref}
        className="input__field"
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        id={id}
        onKeyDown={(event) => {
          if (isNumber && !/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'Enter' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            event.preventDefault()
          }
        }}
        {...rest}
      />
      <div className="input__children">{children}</div>
    </div>
  )
})
