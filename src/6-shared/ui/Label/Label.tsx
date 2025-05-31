import { ReactNode } from 'react'

interface ILabel {
  children: ReactNode
  forElement?: string
  position?: 'start' | 'center' | 'end'
  color?: 'black' | 'white' | 'gray'
}

const Label = ({ children, forElement, position = 'start', color = 'black' }: ILabel) => {
  return (
    <label className={`label ${position && 'label--' + position} ${color && 'label--' + color}`} htmlFor={forElement}>
      {children}
    </label>
  )
}

export default Label
