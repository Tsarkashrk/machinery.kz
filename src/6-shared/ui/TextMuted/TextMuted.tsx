import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const TextMuted = ({ children }: Props) => {
  return <p className="text-muted">{children}</p>
}

export default TextMuted
