import Button from '@/components/ui/Buttons/Button'
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

const PromoCard = ({ cardData }: ICardData) => {
  return (
    <Link className="promo-card" href={cardData.link}>
      <div className="promo-card__wrapper">
        <h1 className="promo-card__title">{cardData.title}</h1>
        <img className="promo-card__image" src={`${cardData.img}`} alt="" />
        {/* <div className="promo-card__button">
        <Button text="More equipment" />
      </div> */}
      </div>
    </Link>
  )
}

export default PromoCard
