export interface IAuthForm {
  username?: string
  email: string
  password: string
}

export interface IUser {
  id: number
  username: string
  email: string
}

export interface IAuthResponse {
  access: string
  refresh: string
  user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
