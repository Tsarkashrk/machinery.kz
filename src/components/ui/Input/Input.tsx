import { forwardRef } from 'react'

interface InputProps {
  id: string
  extra?: string
  state?: 'error' | 'success'
  type: string
  disabled?: boolean
  placeholder?: string
  isNumber?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, placeholder, id, extra, state, disabled, isNumber, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className="input"
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
  )
})

export default Input
