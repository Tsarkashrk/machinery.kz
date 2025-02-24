import { ICON_SIZE } from '@/constants/constants'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

interface Option {
  id: number
  title: string
}

interface DropdownProps {
  name: string
  control: any
  options: Option[]
  placeholder?: string
  rules?: any
}

const CustomDropdown: React.FC<DropdownProps> = ({ name, control, options, placeholder = 'Select an option', rules }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="dropdown">
          {/* Выбранный элемент */}
          <div className={`dropdown__selected ${isOpen ? 'dropdown__selected--open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {field.value ? options.find((o) => o.id === field.value)?.title : placeholder}
            {isOpen ? <ChevronUp size={ICON_SIZE} /> : <ChevronDown size={ICON_SIZE} />}
          </div>

          <ul className={`dropdown__list dropdown__list--${isOpen ? 'open' : 'closed'}`}>
            {options.map((option) => (
              <li
                key={option.id}
                className="dropdown__option"
                onClick={() => {
                  field.onChange(option.id)
                  setIsOpen(false)
                }}>
                {option.title}
              </li>
            ))}
          </ul>

          {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
        </div>
      )}
    />
  )
}

export default CustomDropdown
