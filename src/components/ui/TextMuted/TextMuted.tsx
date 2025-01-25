interface ITextMuted {
  text: string
}

const TextMuted = ({ text }: ITextMuted) => {
  return <p className="text-muted">{text}</p>
}

export default TextMuted
