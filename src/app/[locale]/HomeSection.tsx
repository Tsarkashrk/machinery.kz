'use client'

import { useEquipmentList, useEquipmentWithImages } from '@/entities/equipment'
import Card from '@/shared/components/Cards/Card/Card'
import ProductCard from '@/shared/components/Cards/ProductCard/ProductCard'
import Hero from '@/shared/components/Hero/Hero'
import { useTranslations } from 'next-intl'

const popular = [
  {
    title: 'No cable Drill equipment',
    link: 'drill1',
    image: 'assets/GSR12V-30.webp',
    price: '35 000 KZT',
  },
  {
    title: 'No cable Drill equipment',
    link: 'drill2',
    image: 'assets/GSR12V-30.webp',
    price: '35 000 KZT',
  },
]

export default function HomeSection() {
  const t = useTranslations('HomePage')

  const { data: equipmentList, isLoading, isSuccess } = useEquipmentWithImages()

  return (
    <div className="home-section">
      <div className="home-section__wrapper">
        <Hero />
        <div className="home-section__popular">
          <h1 className="home-section__title">{t('popular-equipment')}</h1>

          <div className="home-section__equipments">{isSuccess && equipmentList?.map((item: any) => <ProductCard key={item.id} title={item.name} price={item.purchase_price} image={item.image} link={item.id} />)}</div>
        </div>
      </div>
    </div>
  )
}
