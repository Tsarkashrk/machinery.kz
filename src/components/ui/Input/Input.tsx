interface IInput {
  type: string
  placeholder?: string
  id: string
}

const Input = ({ type, placeholder, id }: IInput) => {
  return <input className="input" type={type} placeholder={placeholder} id={id} />
}

export default Input
