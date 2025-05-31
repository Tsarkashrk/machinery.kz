import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  fontSize?: string
}

const TextMuted = ({ children, fontSize }: Props) => {
  return (
    <p className="text-muted" style={{ fontSize }}>
      {children}
    </p>
  )
}

export default TextMuted
