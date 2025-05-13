import { useFavorites } from '@/entities/favorite'
import { ICON_SIZE } from '@/shared/constants/constants'
import TextMuted from '@/shared/ui/TextMuted/TextMuted'
import Button from '@/shared/ui/Buttons/Button'
import { Heart } from 'lucide-react'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import { Badge } from '@/shared/ui/Badge/Badge'
import { IEquipmentWithImage } from '@/entities/equipment'
import Image from 'next/image'
import { ToggleFavoriteButton } from '@/features/toggle-favorite'

type Props = {
  available_for_rent: boolean
  daily_rental_rate: string
  purchase_price: string
  name: string
  id: number
  image?: string
}

export const EquipmentCard = ({ available_for_rent, daily_rental_rate, purchase_price, name, id, image }: Props) => {
  const listingType = available_for_rent ? 'rent' : 'sell'
  const equipmentPrice = listingType === 'rent' ? daily_rental_rate : purchase_price

  return (
    <div className="equipment-card">
      <div className="equipment-card__wrapper">
        <div className="equipment-card__badges">
          <Badge type={listingType} text={listingType} />
        </div>
        <Image width={500} height={500} src="/assets/eq2.webp" className="equipment-card__image" alt={'equipment image'} />
        <span className="equipment-card__price">{equipmentPrice}</span>
        <p className="equipment-card__description">{name}</p>
        <div className="equipment-card__available">
          <TextMuted text="Available" />
        </div>
        <div className="equipment-card__buttons">
          <ToggleFavoriteButton productId={id} isFavorite={false}>
            <Heart size={ICON_SIZE} />
          </ToggleFavoriteButton>
          <Button link={`${PLATFORM_PAGES.PRODUCT}/${name}`}>Details</Button>
        </div>
      </div>
    </div>
  )
}
