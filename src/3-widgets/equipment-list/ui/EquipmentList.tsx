"use client";

import { EquipmentCardSmall } from "@/5-entities/equipment";
import {
  IEquipment,
  IEquipmentResponse,
  IEquipmentWithImage,
} from "@/5-entities/equipment/model/equipment.model";
import { Loading } from "@/6-shared/ui/Loading/Loading";
import { EquipmentCard } from "@/3-widgets/equipment-card";

type Props = {
  equipmentList: IEquipment[] | IEquipmentWithImage[] | undefined;
  isLoading: boolean;
  variant?: "vertical" | "horizontal";
  size?: "default" | "small";
  isProfile?: boolean;
};

export const EquipmentList = ({
  isProfile = false,
  equipmentList,
  isLoading,
  variant = "vertical",
  size = "default",
}: Props) => {
  if (isLoading) return <Loading />;

  return (
    <div
      className={`equipment-list equipment-list--${variant} equipment-list--${size}`}
    >
      {equipmentList?.map((equipment: IEquipment) =>
        variant === "vertical" ? (
          <EquipmentCard
            status={isProfile ? equipment.status : undefined}
            key={equipment.id}
            id={equipment.id}
            name={equipment.name}
            image={
              equipment.images?.[0]?.image_url ??
              "/assets/profile-placeholder.png"
            }
            available_for_rent={equipment.available_for_rent}
            daily_rental_rate={equipment.daily_rental_rate}
            purchase_price={equipment.purchase_price}
          />
        ) : (
          <EquipmentCardSmall key={equipment.id} equipment={equipment} />
        ),
      )}
    </div>
  );
};
