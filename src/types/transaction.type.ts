import { IEquipment } from './equipment.type'
import { IUser } from './user.type'

interface ITransactionBase {
  id: number
  equipment_details: IEquipment
  status: string
}

interface ITransactionRequestBase {
  equipment: number
  status: string
}

export interface IPurchaseTransaction extends ITransactionBase {
  buyer_details: IUser
  amount: string
  purchase_terms: string
  purchase_date: string
}

export interface IPurchaseTransactionRequest extends ITransactionRequestBase {
  buyer: number
  amount: string
  purchase_terms: string
}

export interface IRentalTransaction extends ITransactionBase {
  renter_details: IUser
  total_amount: string
  start_date: string
  end_date: string
  duration_days: string
  rental_terms: string
  created_at: string
}

export interface IRentalTransactionRequest extends ITransactionRequestBase {
  renter: number
  start_date: string
  end_date: string
  total_amount: string
  rental_terms: string
}
