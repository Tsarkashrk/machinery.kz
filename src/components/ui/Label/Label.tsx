interface ILabel {
  text: string
  forElement: string
}

const Label = ({ text, forElement }: ILabel) => {
  return (
    <label className="label" htmlFor={forElement}>
      {text}
    </label>
  )
}

export default Label
