import { Metadata } from 'next'
import LoginSection from './LoginSection'

export const metadata: Metadata = {
  title: 'Login',
}

const LoginPage = () => {
  return <LoginSection />
}

export default LoginPage
