'use client'

import { PLATFORM_PAGES } from '@/config/pages-url.config'
import Carousel from '../Carousel/Carousel'
import { equipmentApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

const carouselItems = [
  {
    img: '/assets/Dewalt1.webp',
    title: 'Super price',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/345`,
    price: '34.000',
  },
  {
    img: '/assets/Bosch2.jpg',
    title: 'Super price',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/343`,
    price: '34.000',
  },
  {
    img: '/assets/Stanley1.jpg',
    title: 'Super price',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/3412`,
    price: '34.000',
  },
]

const smallCarouselItems = [
  {
    img: '/assets/equipment1.webp',
    title: 'Super price',
    description: 'Pneumatic wrench SUMAKE ST-C541K with a set of heads 1/2" 434Hm 10 pcs. 4118210',
    link: `${PLATFORM_PAGES.PRODUCT}/340`,
    price: '34.000',
  },
  {
    img: '/assets/equipment1.webp',
    title: 'Super price',
    description: 'Pneumatic wrench SUMAKE ST-C541K with a set of heads 1/2" 434Hm 10 pcs. 4118210',
    link: `${PLATFORM_PAGES.PRODUCT}/349`,
    price: '34.000',
  },
]

const Hero = () => {
  const equipmentsData = useQuery({
    queryKey: ['equipment'],
    queryFn: () => equipmentApi.getAllEquipment(),
  })

  console.log(equipmentsData.data)

  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__sliders">
          <Carousel carouselItems={carouselItems} variant="banner" />
          <Carousel carouselItems={smallCarouselItems} />
        </div>
      </div>
    </section>
  )
}

export default Hero
