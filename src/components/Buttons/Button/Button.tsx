import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const Button = ({ children, text }: PropsWithChildren<IButton>) => {
  return (
    <button>
      {children} {text}
    </button>
  )
}

export default Button
