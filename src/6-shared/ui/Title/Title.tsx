import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: 'gray' | string
  fontWeight?: string
}

const Title = ({ children, size = 'h1', color, fontWeight }: Props) => {
  if (size === 'h1') {
    return (
      <h1 className="title" style={{ color: color, fontWeight }}>
        {children}
      </h1>
    )
  } else if (size === 'h2') {
    return (
      <h2 className="title" style={{ color: color, fontWeight }}>
        {children}
      </h2>
    )
  } else if (size === 'h3') {
    return (
      <h3 className="title" style={{ color: color, fontWeight }}>
        {children}
      </h3>
    )
  } else if (size === 'h4') {
    return (
      <h4 className="title" style={{ color: color, fontWeight }}>
        {children}
      </h4>
    )
  } else if (size === 'h5') {
    return (
      <h5 className="title" style={{ color: color, fontWeight }}>
        {children}
      </h5>
    )
  } else if (size === 'h6') {
    return (
      <h6 className="title" style={{ color: color, fontWeight }}>
        {children}
      </h6>
    )
  }
}

export default Title
