import { ICompany } from '@/entities/company'
import { IUser } from '@/entities/user'

export interface IDealerData {
  users: IUser[]
  companies: ICompany[]
}
