import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: 'gray' | string
  fontSize?: string
  fontWeight?: string
  fontFamily?: 'gilroy' | 'geist'
}

export const Title = ({ children, size = 'h1', color, fontSize, fontWeight, fontFamily = 'gilroy' }: Props) => {
  if (size === 'h1') {
    return (
      <h1 className={`title ${fontFamily && 'title--' + fontFamily}`} style={{ color, fontWeight, fontSize }}>
        {children}
      </h1>
    )
  } else if (size === 'h2') {
    return (
      <h2 className={`title ${fontFamily && 'title--' + fontFamily}`} style={{ color, fontWeight, fontSize }}>
        {children}
      </h2>
    )
  } else if (size === 'h3') {
    return (
      <h3 className={`title ${fontFamily && 'title--' + fontFamily}`} style={{ color, fontWeight, fontSize }}>
        {children}
      </h3>
    )
  } else if (size === 'h4') {
    return (
      <h4 className={`title ${fontFamily && 'title--' + fontFamily}`} style={{ color, fontWeight, fontSize }}>
        {children}
      </h4>
    )
  } else if (size === 'h5') {
    return (
      <h5 className={`title ${fontFamily && 'title--' + fontFamily}`} style={{ color, fontWeight, fontSize }}>
        {children}
      </h5>
    )
  } else if (size === 'h6') {
    return (
      <h6 className={`title ${fontFamily && 'title--' + fontFamily}`} style={{ color, fontWeight, fontSize }}>
        {children}
      </h6>
    )
  }
}
