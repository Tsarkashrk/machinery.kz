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
    <Link href={link}>
      <img src="https://whatispiping.com/wp-content/uploads/2021/02/Name-of-Construction-Equipment.png" alt="" />
    </Link>
  )
}

export default CarouselCard
