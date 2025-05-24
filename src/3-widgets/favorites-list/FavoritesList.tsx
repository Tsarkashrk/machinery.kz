'use client'

import { IFavorite } from '@/entities/favorite'
import { EquipmentCard } from '@/widgets/equipment-card'

type Props = {
  favoritesList: IFavorite[]
  isLoading: boolean
}

export const FavoritesList = ({ favoritesList, isLoading }: Props) => {
  return isLoading ? (
    'loading'
  ) : (
    <div className="equipment-list">
      {favoritesList?.map((favorite: IFavorite) => (
        <EquipmentCard key={favorite.equipment.id} available_for_rent={favorite.equipment.available_for_rent} daily_rental_rate={favorite.equipment.daily_rental_rate} purchase_price={favorite.equipment.purchase_price} name={favorite.equipment.name} id={favorite.equipment.id} />
      ))}
    </div>
  )
}
