import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  color?: string
}

export const TitleDescription = ({ children, color }: Props) => {
  return (
    <h3 className="title-description" style={{ color: color }}>
      {children}
    </h3>
  )
}
