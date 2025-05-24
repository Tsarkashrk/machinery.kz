import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Description = ({ children }: Props) => {
  return <p className="description">{children}</p>
}
