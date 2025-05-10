export interface IAuth {
  access: string
  refresh: string
}

export interface IAuthLoginRequest {
  email: string
  password: string
}

export interface IAuthRegisterRequest {
  username: string
  email: string
  password: string
}
