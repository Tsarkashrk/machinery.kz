import Button from '@/components/ui/Buttons/Button'
import { Heart } from 'lucide-react'
import TextMuted from '@/components/ui/TextMuted/TextMuted'
import Link from 'next/link'
import React from 'react'
import { ICON_SIZE } from '@/constants/constants'

interface ProductCardProps {
  title: string
  price: string
  image: string
  link: string
}

const ProductCard = (data: ProductCardProps) => {
  return (
    <Link href={data.link} className="product-card">
      <div className="product-card__wrapper">
        <img src={data.image} className="product-card__image" />
        <span className="product-card__price">{data.price}</span>
        <p className="product-card__description">{data.title}</p>
        <div className="product-card__available">
          <TextMuted text="Available" />
        </div>
        <div className="product-card__buttons">
          <Button icon={<Heart size={ICON_SIZE} />} />
          <Button text="Details" />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
