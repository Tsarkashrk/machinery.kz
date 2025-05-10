export enum EnumUserRoles {
  'admin' = 'admin',
  'user' = 'user',
}

export interface IUser {
  id: number
  email: string
  username: string
  is_verified: boolean
  date_joined: string
  user_role: EnumUserRoles
}

export interface IUserRequest {
  email: string
  username: string
}
