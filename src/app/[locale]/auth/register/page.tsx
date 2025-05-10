import { Metadata } from 'next'
import RegisterSection from './RegisterSection'

export const metadata: Metadata = {
  title: 'Register',
}

const RegisterPage = () => {
  return <RegisterSection />
}

export default RegisterPage
