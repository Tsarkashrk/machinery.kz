import TextMuted from '../ui/TextMuted/TextMuted'
import Title from '../ui/Title/Title'
import Label from '../ui/Label/Label'
import Input from '../ui/Input/Input'
import Button from '../ui/Button/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

const AuthForm = () => {
  return (
    <div className="auth-form">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title text="Login to your account" />
          <TextMuted text="Enter your email below to login to your account" />
        </div>
        <div className="auth-form__body">
          <div className="auth-form__credentials">
            <Label text="Email" forElement="email" />
            <Input type="text" id="email" placeholder="mchnry@ex.com" />
          </div>
          <div className="auth-form__credentials">
            <Label text="Password" forElement="password" />
            <Input type="password" id="password" />
          </div>
          <Button text="Login" variant="dark" />
          <Button text="Login with Google" variant="outlined" />
        </div>
        <p className="auth-form__footer">
          Don't have an account? <Button isLink link={PLATFORM_PAGES.REGISTER} variant="underlined" text="Sign up" />
        </p>
      </div>
    </div>
  )
}

export default AuthForm
