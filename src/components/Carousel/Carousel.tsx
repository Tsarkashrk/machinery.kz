'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { ReactNode } from 'react'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import CarouselCard from '../Cards/CarouselCard/CarouselCard'

interface Slide {
  img: ReactNode
  title: string
  description: string
  link: string
}

interface ICarousel {
  items: Slide[]
}

const CarouselItems = [
  {
    img: '',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.PURCHASE}/345`,
  },
  {
    img: '',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.PURCHASE}/344`,
  },
  {
    img: '',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.PURCHASE}/343`,
  },
  {
    img: '',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.PURCHASE}/342`,
  },
  {
    img: '',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.PURCHASE}/341`,
  },
]

const Carousel = () => {
  return (
    <Swiper spaceBetween={50} slidesPerView={1} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
      {CarouselItems.map((item) => (
        <SwiperSlide key={item.link}>
          <CarouselCard title={item.title} link={item.link} description={item.description} img={item.img} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
