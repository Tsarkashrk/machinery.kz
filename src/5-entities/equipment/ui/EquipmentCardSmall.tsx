import React from 'react';
import { IEquipment, IEquipmentWithImage } from '../model/equipment.model';
import Image from 'next/image';
import { Title } from '@/6-shared/ui/Title/Title';
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription';
import Link from 'next/link';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { Badge } from '@/6-shared/ui/Badge/Badge';
import { useTranslations } from 'next-intl';

interface Props {
  equipment: IEquipment;
}

export const EquipmentCardSmall = ({ equipment }: Props) => {
  const tBadge = useTranslations('Badge');
  const listingType = equipment.available_for_rent ? 'rent' : 'sell';
  const equipmentPrice =
    listingType === 'rent'
      ? equipment.daily_rental_rate
      : equipment.purchase_price;

  return (
    <Link
      href={`${PLATFORM_PAGES.PRODUCTS}/${equipment.id}`}
      className="equipment-card equipment-card--small"
    >
      <div className="equipment-card__container">
        <Image
          className="equipment-card__image"
          src={
            equipment?.images[0]?.image_url
              ? equipment?.images[0]?.image_url
              : `/assets/profile-placeholder.png`
          }
          width={70}
          height={70}
          alt={''}
        />
        <div className="equipment-card__info">
          <p className="equipment-card__title">{equipment.name}</p>
          <TitleDescription
            fontSize="14px"
            color="gray"
          >
            {equipment.description}
          </TitleDescription>
        </div>
        <div className="equipment-card__badge">
          <Badge type={listingType === 'rent' ? 'green' : 'red'}>
            {tBadge(listingType)}
          </Badge>
        </div>
      </div>
      <p className="equipment-card__price">{equipmentPrice} T</p>
    </Link>
  );
};
