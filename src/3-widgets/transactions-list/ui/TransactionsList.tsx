'use client';

import { EquipmentCardSmall } from '@/5-entities/equipment';
import {
  IEquipment,
  IEquipmentWithImage,
} from '@/5-entities/equipment/model/equipment.model';
import { Loading } from '@/6-shared/ui/Loading/Loading';
import { TransactionCard } from '@/3-widgets/transaction-card/ui/TransactionCard';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  equipmentList: IEquipment[] | IEquipmentWithImage[] | undefined;
  isLoading?: boolean;
  variant?: 'vertical' | 'horizontal';
  size?: 'default' | 'small';
  isProfile?: boolean;
  tab: string;
  onTransactionUpdate?: () => void;
};

export const TransactionsList = ({
  isProfile = false,
  equipmentList,
  isLoading,
  variant = 'vertical',
  tab,
  size = 'default',
  onTransactionUpdate,
}: Props) => {
  if (isLoading) return <Loading />;

  const getTransactionType = (equipment: any) => {
    if (equipment.equipment_details?.available_for_rent !== undefined) {
      return equipment.equipment_details.available_for_rent ? 'rent' : 'sale';
    }
    if (equipment.buyer_details || equipment.seller_details) {
      return 'sale';
    }
    return 'rent';
  };

  return (
    <div
      className={`transactions-list transactions-list--${variant} transactions-list--${size}`}
    >
      {equipmentList?.map((equipment: any) =>
        variant === 'vertical' ? (
          <TransactionCard
            tab={tab}
            transaction={equipment}
            transactionType={getTransactionType(equipment)}
            transactionProcess={equipment.status}
            status={isProfile ? equipment.equipment_details?.status : undefined}
            key={equipment.id}
            id={equipment.equipment_details?.id}
            name={equipment.equipment_details?.name}
            city={equipment.equipment_details?.location_city}
            address={equipment.equipment_details?.location_address}
            ownerId={equipment.equipment_details?.owner}
            renter={equipment.renter_details}
            seller={equipment.seller_details}
            buyer={equipment.buyer_details}
            equipment={equipment.equipment_details}
            onTransactionUpdate={onTransactionUpdate}
            image={
              equipment.equipment_details?.images?.[0]?.image_url ??
              '/assets/profile-placeholder.png'
            }
            available_for_rent={equipment.equipment_details?.available_for_rent ?? false}
            daily_rental_rate={equipment.equipment_details?.daily_rental_rate ?? '0'}
            purchase_price={equipment.equipment_details?.purchase_price ?? equipment.amount ?? '0'}
          />
        ) : (
          <EquipmentCardSmall
            key={equipment.id}
            equipment={equipment}
          />
        ),
      )}
    </div>
  );
};