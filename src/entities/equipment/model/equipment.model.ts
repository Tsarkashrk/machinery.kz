import { ICategory } from '@/entities/category'

interface IEquipmentBase {
  name: string
  description: string
  daily_rental_rate: string
  purchase_price: string
  manufacturer: string
  model: string
  year: number
  condition: string
  owner: number
  available_for_rent: boolean
  available_for_sale: boolean
}

export interface IEquipment extends IEquipmentBase {
  id: number

  category_details: ICategory

  created_at: string
}

export interface IEquipmentRequest extends IEquipmentBase {
  category: number
}
