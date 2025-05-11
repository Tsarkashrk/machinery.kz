import { IEquipment } from '@/entities/equipment'

export interface IFavoriteBase {
  id: number
  equipment: IEquipment | string
  created_at: string
}

export interface IFavorite extends IFavoriteBase {}

export interface IFavoriteRequest extends IFavoriteBase {}
