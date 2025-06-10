'use client';

import { IFavorite } from '@/5-entities/favorite';
import { EquipmentCard } from '@/3-widgets/equipment-card';

type Props = {
  favoritesList: IFavorite[];
  isLoading: boolean;
};

export const FavoritesList = ({ favoritesList, isLoading }: Props) => {
  return isLoading ? (
    'loading'
  ) : (
    <div className="equipment-list">
      {favoritesList?.map((favorite: IFavorite) => (
        <EquipmentCard
          key={favorite.equipment.id}
          available_for_rent={favorite.equipment.available_for_rent}
          daily_rental_rate={favorite.equipment.daily_rental_rate}
          purchase_price={favorite.equipment.purchase_price}
          name={favorite.equipment.name}
          id={favorite.equipment.id}
          city={favorite.equipment.location_city}
          address={favorite.equipment.location_address}
          ownerId={favorite.equipment.owner}
        />
      ))}
    </div>
  );
};
