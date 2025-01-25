import AuthForm from '@/components/AuthForm/AuthForm'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

const RegisterPage = () => {
  return (
    <main>
      <AuthForm title="Create a new account" description="Fill in the fields below to register a new account" buttonText="Sign up" linkText="Already have an account?" linkUrl={PLATFORM_PAGES.LOGIN} signText='Sign in'/>
    </main>
  )
}

export default RegisterPage
