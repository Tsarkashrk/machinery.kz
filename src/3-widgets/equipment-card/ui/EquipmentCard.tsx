import { ICON_SIZE } from '@/6-shared/constants/constants'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import Button from '@/6-shared/ui/Buttons/Button'
import { Heart, MapPin } from 'lucide-react'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { Badge } from '@/6-shared/ui/Badge/Badge'
import Image from 'next/image'
import { ToggleFavoriteButton } from '@/4-features/toggle-favorite'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Title } from '@/6-shared/ui/Title/Title'
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription'
import { Description } from '@/6-shared/ui/Description/Description'
import Avatar from '@/6-shared/ui/Avatar/Avatar'
import { useFavorites } from '@/5-entities/favorite'
import { useEffect, useState } from 'react'

type Props = {
  available_for_rent: boolean
  daily_rental_rate: string
  purchase_price: string
  name: string
  id: number
  image?: string
  variant?: 'wide'
  status?: string
}

export const EquipmentCard = ({ available_for_rent, daily_rental_rate, purchase_price, name, id, image, variant, status }: Props) => {
  const [statusState, setStatusState] = useState('PENDING')
  const [colorState, setColorState] = useState<'success' | 'error' | 'warning'>('warning')

  const t = useTranslations('Button')
  const tBadge = useTranslations('Badge')
  const {} = useFavorites()

  const listingType = available_for_rent ? 'rent' : 'sell'
  const equipmentPrice = listingType === 'rent' ? daily_rental_rate : purchase_price

  useEffect(() => {
    if (status === 'PENDING') {
      setStatusState('На рассмотрении')
      setColorState('warning')
    } else if (status === 'AVAILABLE') {
      setStatusState('Опубликован')
      setColorState('success')
    } else {
      setStatusState('Отклонен')
      setColorState('error')
    }
  }, [status])

  return (
    <Link href={`${PLATFORM_PAGES.PRODUCT}/${id}`} className={`equipment-card ${variant && `equipment-card--${variant}`}`}>
      <div className="equipment-card__wrapper">
        <div className="equipment-card__image-container">
          <div className="equipment-card__header">
            <div className="equipment-card__badges">
              <Badge type={listingType}>{tBadge(listingType)}</Badge>
              {status && <Badge type={colorState}>{statusState}</Badge>}
            </div>
            <ToggleFavoriteButton productId={id} isFavorite={false} />
          </div>
          <Image width={500} height={500} src={image ? image : `/assets/profile-placeholder.png`} className="equipment-card__image" alt={'equipment image'} />
        </div>
        <div className="equipment-card__content">
          {/* <Avatar link={`${PLATFORM_PAGES.DEALERS}/${id}`} username={'sdf'} /> */}
          <Title size="h3" fontSize="18" fontWeight="600">
            {name}
          </Title>
          <Description>
            <MapPin fill="true" size={ICON_SIZE} /> Turkey, Antalia, Kerchiberuo 11
          </Description>
          <hr className="equipment-card__line" />
          <div className="equipment-card__price">
            T {equipmentPrice} {listingType === 'rent' && <TextMuted>/ в день</TextMuted>}
          </div>
        </div>
      </div>
    </Link>
  )
}
