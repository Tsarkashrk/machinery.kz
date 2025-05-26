type Props = {
  text: string
  type: 'dark' | 'light' | 'sale' | 'rent' | 'sell'
}

export const Badge = ({ type, text }: Props) => {
  return <p className={`badge badge--${type}`}>{text}</p>
}
