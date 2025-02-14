import { Metadata } from 'next'
import RegisterView from './RegisterSection'

export const metadata: Metadata = {
  title: 'Register',
}

const RegisterPage = () => {
  return (
      <RegisterView />
  )
}

export default RegisterPage
