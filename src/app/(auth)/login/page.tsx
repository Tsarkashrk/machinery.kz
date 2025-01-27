import AuthForm from '@/components/AuthForm/AuthForm'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

const LoginPage = () => {
  return (
    <main>
      <AuthForm title="Log in to your account" description="Enter your credentials below to log in to your account" buttonText="Log in" additionalButtonText="Log in with Google" linkText="Don't have an account?" linkUrl={PLATFORM_PAGES.REGISTER} signText="Sign up" />
    </main>
  )
}

export default LoginPage
