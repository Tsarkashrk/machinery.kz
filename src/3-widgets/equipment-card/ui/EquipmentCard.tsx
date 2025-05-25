import { ICON_SIZE } from '@/6-shared/constants/constants'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import Button from '@/6-shared/ui/Buttons/Button'
import { Heart } from 'lucide-react'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { Badge } from '@/6-shared/ui/Badge/Badge'
import Image from 'next/image'
import { ToggleFavoriteButton } from '@/4-features/toggle-favorite'
import { useTranslations } from 'next-intl'

type Props = {
  available_for_rent: boolean
  daily_rental_rate: string
  purchase_price: string
  name: string
  id: number
  image?: string
}

export const EquipmentCard = ({ available_for_rent, daily_rental_rate, purchase_price, name, id, image }: Props) => {
  const t = useTranslations('Button')
  const tBadge = useTranslations('Badge')

  const listingType = available_for_rent ? 'rent' : 'sell'
  const equipmentPrice = listingType === 'rent' ? daily_rental_rate : purchase_price

  return (
    <div className="equipment-card">
      <div className="equipment-card__wrapper">
        <div className="equipment-card__badges">
          <Badge type={listingType} text={tBadge(listingType)} />
        </div>
        <Image width={500} height={500} src={`/assets/eq2.webp`} className="equipment-card__image" alt={'equipment image'} />
        <span className="equipment-card__price">{name}</span>
        <p className="equipment-card__description">{equipmentPrice}</p>
        <div className="equipment-card__buttons">
          <ToggleFavoriteButton productId={id} isFavorite={false}>
            <Heart size={ICON_SIZE} />
          </ToggleFavoriteButton>
          <Button link={`${PLATFORM_PAGES.PRODUCT}/${id}`}>{t('details')}</Button>
        </div>
      </div>
    </div>
  )
}
