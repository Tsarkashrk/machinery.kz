import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  fontSize?: string
  color?: string
}

const TextMuted = ({ children, fontSize, color }: Props) => {
  return (
    <p className="text-muted" style={{ fontSize, color }}>
      {children}
    </p>
  )
}

export default TextMuted
