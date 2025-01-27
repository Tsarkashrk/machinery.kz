import Link from 'next/link'
import { ReactNode } from 'react'

interface ICarouselCard {
  title: string
  description: string
  link: string
  img: ReactNode
}

const CarouselCard = ({ title, description, link, img }: ICarouselCard) => {
  return (
    <Link className='carousel-card' href={link}>
      <img className='carousel-card__image' src="https://www.stoneequipmentco.com/images/Blog/heavy_equipment_company.jpg" alt="" />
    </Link>
  )
}

export default CarouselCard
