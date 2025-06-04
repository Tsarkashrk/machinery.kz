import { Metadata } from 'next'
import LoginSection from './LoginSection'

export const metadata: Metadata = {
  title: 'Авторизация',
}

const LoginPage = () => {
  return <LoginSection />
}

export default LoginPage
