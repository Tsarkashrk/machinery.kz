import React from 'react'

interface ITitle {
  text: string
}

const Title = ({ text }: ITitle) => {
  return <h1 className="title">{text}</h1>
}

export default Title
