import { EquipmentList } from '@/3-widgets/equipment-list'
import { useEquipmentWithImages } from '@/5-entities/equipment'
import { Description } from '@/6-shared/ui/Description/Description'
import Title from '@/6-shared/ui/Title/Title'
import Image from 'next/image'

type Props = {
  id: number
  logoUrl: string
  name: string
  description: string
  foundedYear: number
}

export const BrandHeader = ({ id, logoUrl, name, description, foundedYear }: Props) => {
  return (
    <div className="brand-header">
      <div className="brand-header__wrapper">
        <div className="brand-header__info">
          <Image className="brand-header__logo" width={300} height={300} src={logoUrl} alt={name || 'Brand logo'} />
          <div className="brand-header__text">
            <Title>
              {name} ({foundedYear})
            </Title>
            <Description>{description}</Description>
          </div>
        </div>
      </div>
    </div>
  )
}
