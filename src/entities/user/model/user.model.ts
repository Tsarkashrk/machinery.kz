export interface IUser {
  id: number
  email: string
  username: string
  is_verified: boolean
  date_joined: string
  user_role: string
}

export type TypeUserEdit = Partial<Omit<IUser, 'id' | 'is_verified' | 'date_joined'>>
