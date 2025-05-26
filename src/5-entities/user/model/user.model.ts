export enum EnumUserRoles {
  'admin' = 'admin',
  'user' = 'user',
  'moderator' = 'moderator',
}

export interface IUser {
  id: number
  email: string
  username: string
  is_verified: boolean
  date_joined: string
  user_role: EnumUserRoles
  image_url: string
  first_name: string
  last_name: string
  address: string
  phone_number: string
}

export interface IUserRequest {
  email: string
  username: string
}
