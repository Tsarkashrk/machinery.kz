import Link from 'next/link'

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

const CarouselCard = ({ secondary, cardData }: ICardData) => {
  return (
    <Link className={`carousel-card ${secondary && 'carousel-card--secondary'}`} href={cardData.link}>
      <h1 className="carousel-card__title">{cardData.title}</h1>
      <img className="carousel-card__image" src={`${cardData.img}`} alt="" />
      {/* <div className="carousel-card__button">
        <Button text="More equipment" />
      </div> */}
    </Link>
  )
}

export default CarouselCard
