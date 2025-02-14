import { Metadata } from 'next'
import LoginView from './LoginSection'

export const metadata: Metadata = {
  title: 'Login',
}

const LoginPage = () => {
  return (
      <LoginView />
  )
}

export default LoginPage
