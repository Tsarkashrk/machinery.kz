interface ILabel {
  text: string
  forElement?: string
  position?: 'start' | 'center' | 'end'
  color?: 'black' | 'white' | 'gray'
}

const Label = ({ text, forElement, position = 'start', color = 'black' }: ILabel) => {
  return (
    <label className={`label ${position && 'label--' + position} ${color && 'label--' + color}`} htmlFor={forElement}>
      {text}
    </label>
  )
}

export default Label
