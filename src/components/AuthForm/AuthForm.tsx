import TextMuted from '../ui/TextMuted/TextMuted'
import Title from '../ui/Title/Title'
import Label from '../ui/Label/Label'
import Input from '../ui/Input/Input'
import Button from '../ui/Button/Button'

interface IAuthForm {
  title: string
  description: string
  buttonText: string
  linkText: string
  linkUrl: string
  additionalButtonText?: string
  signText: string
  onSubmit?: () => void
}

const AuthForm = ({ title, description, buttonText, linkText, linkUrl, additionalButtonText, signText, onSubmit }: IAuthForm) => {
  return (
    <div className="auth-form">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title text={title} />
          <TextMuted text={description} />
        </div>
        <form className="auth-form__body" onSubmit={onSubmit}>
          <div className="auth-form__credentials">
            <Label text="Email" forElement="email" />
            <Input type="text" id="email" placeholder="mchnry@ex.com" />
          </div>
          <div className="auth-form__credentials">
            <Label text="Password" forElement="password" />
            <Input type="password" id="password" />
          </div>
          <Button text={buttonText} variant="dark" />
          {additionalButtonText && <Button text={additionalButtonText} variant="outlined" />}
        </form>
        <p className="auth-form__footer">
          {linkText && (
            <>
              {linkText} <Button isLink link={linkUrl} variant="underlined" text={signText} />
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default AuthForm
