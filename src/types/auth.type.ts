export interface IAuthForm {
  username: string
  email: string
  password: string
}

export interface IAuthResponse {
  access: string
  refresh: string
}
