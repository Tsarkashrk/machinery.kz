'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import image1 from '/assets/BITurbo_banner_900x380_v1.jpg'
import image2 from '/assets/BlackDecker-banner-1024x380.jpg'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { PLATFORM_PAGES } from '@/config/pages-url.config'
import CarouselCard from '../Cards/CarouselCard/CarouselCard'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { PropsWithChildren } from 'react'
import BannerCard from '../Cards/BannerCard/BannerCard'
import PromoCard from '../Cards/PromoCard/PromoCard'

type CarouselItem = {
  img: string
  title: string
  description: string
  link: string
}

interface ICarousel {
  secondary?: boolean
  carouselItems: CarouselItem[]
  variant?: 'banner' | 'promo' | 'default'
}

const Carousel = ({ secondary, carouselItems, variant = 'default' }: ICarousel) => {
  return (
    <Swiper
      className={`carousel ${secondary && 'carousel--secondary'}`}
      spaceBetween={1}
      slidesPerView={1}
      pagination
      navigation
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}>
      {carouselItems.map((item) => (
        <SwiperSlide className="carousel__slide" key={item.link} style={{ width: '100%' }}>
          {variant === 'banner' ? <BannerCard secondary={secondary} cardData={item} /> : variant === 'promo' ? <PromoCard secondary={secondary} cardData={item} /> : <PromoCard secondary={secondary} cardData={item} />}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
