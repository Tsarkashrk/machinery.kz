import { Metadata } from 'next'
import LoginView from './LoginView'

export const metadata: Metadata = {
  title: 'Login',
}

const LoginPage = () => {
  return (
    <main>
      <LoginView />
    </main>
  )
}

export default LoginPage
