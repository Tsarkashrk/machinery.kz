'use client'

import Card from '@/components/Cards/Card/Card'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const product = {
  name: 'Some text here',
  description: 'description text here',
  img: '/assets/GSR12V-30.webp',
}

const ProductSlug = () => {
  const { id } = useParams()

  return (
    <section className="product-slug">
      <div className="product-slug__wrapper">
        <Card>
          <img src={product.img} alt="" />
        </Card>
        <Card>Some tinh</Card>
      </div>
    </section>
  )
}

export default ProductSlug
