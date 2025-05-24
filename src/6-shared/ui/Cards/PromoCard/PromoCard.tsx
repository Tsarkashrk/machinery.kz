import Link from 'next/link'

type CarouselItem = {
  img: string
  title: string
  description: string
  link: string
  price: string
}

interface ICardData {
  cardData: CarouselItem
  secondary?: boolean
}

export const PromoCard = ({ cardData }: ICardData) => {
  return (
    <Link className="promo-card" href={cardData.link}>
      <div className="promo-card__wrapper">
        <h2 className="promo-card__title">{cardData.title}</h2>
        <img className="promo-card__image" src={`${cardData.img}`} alt="" />
        <div className="promo-card__info">
          <p className="promo-card__description">{cardData.description}</p>
          <span className="promo-card__price">{cardData.price} KZT</span>
        </div>
        {/* <div className="promo-card__button">
        <Button text="More equipment" />
      </div> */}
      </div>
    </Link>
  )
}
