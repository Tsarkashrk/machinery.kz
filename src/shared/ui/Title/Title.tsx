import React from 'react'

type Props = {
  text: string
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Title = ({ text, size = 'h1' }: Props) => {
  if (size === 'h1') {
    return <h1>{text}</h1>
  } else if (size === 'h2') {
    return <h2>{text}</h2>
  } else if (size === 'h3') {
    return <h3>{text}</h3>
  } else if (size === 'h4') {
    return <h4>{text}</h4>
  } else if (size === 'h5') {
    return <h5>{text}</h5>
  } else if (size === 'h6') {
    return <h6>{text}</h6>
  }
}

export default Title
