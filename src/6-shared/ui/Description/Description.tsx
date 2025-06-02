import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  fontSize?: string
}

export const Description = ({ children, fontSize }: Props) => {
  return (
    <p className="description" style={{ fontSize }}>
      {children}
    </p>
  )
}
