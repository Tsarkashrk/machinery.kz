import { IEquipment } from './equipment.type'

export interface IFavorite {
  id: number

  equipment: IEquipment
  
  created_at: string
}

export interface IFavoriteRequest {
  equipment: number
}
