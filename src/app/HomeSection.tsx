import Card from '@/components/Cards/Card/Card'
import ProductCard from '@/components/Cards/ProductCard/ProductCard'
import Hero from '@/components/Hero/Hero'
import React from 'react'

const popular = [
  {
    title: 'No cable Drill equipment',
    link: 'drill1',
    image: 'assets/GSR12V-30.webp',
    price: '35 000 KZT',
  },
  {
    title: 'No cable Drill equipment',
    link: 'drill2',
    image: 'assets/GSR12V-30.webp',
    price: '35 000 KZT',
  },
]

const HomeSection = () => {
  return (
    <div className="home-section">
      <div className="home-section__wrapper">
        <Hero />
        <div className="home-section__popular">
          <h1 className="home-section__title">Popular equipment</h1>
          <div className="home-section__equipments">
            {popular.map((item) => (
              <ProductCard key={item.link} title={item.title} price={item.price} image={item.image} link={item.link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection
