type Props = {
  text: string
  type: 'dark' | 'light' | 'sale' | 'rent' | 'sell'
}

export const Badge = ({ type, text }: Props) => {
  return (
    <div className={`badge badge--${type}`}>
      <p className="badge__text">{text}</p>
    </div>
  )
}
