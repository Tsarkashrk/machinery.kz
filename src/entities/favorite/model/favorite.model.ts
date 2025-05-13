import { IEquipment } from '@/entities/equipment'

interface IFavoriteBase {
  id: number
  created_at: string
}

export interface IFavorite extends IFavoriteBase {
  equipment: IEquipment
}

export interface IFavoriteRequest extends IFavoriteBase {
  equipment: string
}

export interface IFavoriteWithImage extends IFavorite {
  image: string
}
