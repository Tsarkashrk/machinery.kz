import AuthForm from '@/components/AuthForm/AuthForm'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

const LoginPage = () => {
  return (
    <main>
      <AuthForm title="Sign in to your account" description="Enter your credentials below to login to your account" buttonText="Sign in" additionalButtonText="Sign in with Google" linkText="Don't have an account?" linkUrl={PLATFORM_PAGES.REGISTER} signText="Sign up" />
    </main>
  )
}

export default LoginPage
