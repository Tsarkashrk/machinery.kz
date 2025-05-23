import { IBrand } from '@/entities/brand/model/brand.model'
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

export interface IEquipmentResponse {
  count: number
  next: string
  previous: string
  results: IEquipment[]
}

export interface IEquipmentData {
  count: number
  next: string
  previous: string
  results: IEquipment[]
}

export interface IEquipment extends IEquipmentBase {
  id: number
  category_details: ICategory
  brand_details: IBrand
  created_at: string
}

export interface IEquipmentRequest extends IEquipmentBase {
  category: number
}

export interface IEquipmentWithImage extends IEquipment {
  image: string
}
