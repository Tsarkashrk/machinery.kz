import Button from '@/shared/ui/Buttons/Button'
import Link from 'next/link'
import { ReactNode } from 'react'

type CarouselItem = {
  img: string
  title: string
  description: string
  link: string
}

interface ICardData {
  cardData: CarouselItem
  secondary?: boolean
}

const BannerCard = ({ secondary, cardData }: ICardData) => {
  return (
    <Link className={`banner-card ${secondary && 'banner-card--secondary'}`} href={cardData.link}>
      <img className="banner-card__image" src={`${cardData.img}`} alt="" />
    </Link>
  )
}

export default BannerCard
