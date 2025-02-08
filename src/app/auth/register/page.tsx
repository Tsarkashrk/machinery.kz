import { Metadata } from 'next'
import RegisterView from './RegisterView'

export const metadata: Metadata = {
  title: 'Register',
}

const RegisterPage = () => {
  return (
    <main>
      <RegisterView />
    </main>
  )
}

export default RegisterPage
