import { PLATFORM_PAGES } from '@/config/pages-url.config'
import Carousel from '../Carousel/Carousel'

const carouselItems = [
  {
    img: '/assets/BITurbo_banner_900x380_v1.jpg',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/345`,
  },
  {
    img: '/assets/BlackDecker-banner-1024x380.jpg',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/344`,
  },
  {
    img: '/assets/BITurbo_banner_900x380_v1.jpg',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/343`,
  },
  {
    img: '/assets/BlackDecker-banner-1024x380.jpg',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/342`,
  },
  {
    img: '/assets/BITurbo_banner_900x380_v1.jpg',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/341`,
  },
]

const smallCarouselItems = [
  {
    img: '/assets/equipment1.webp',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/340`,
  },
  {
    img: '/assets/equipment1.webp',
    title: 'Example',
    description: 'example desc',
    link: `${PLATFORM_PAGES.CATALOG}/349`,
  },
]

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <Carousel carouselItems={carouselItems} variant="banner" />
        <Carousel secondary carouselItems={smallCarouselItems} />
      </div>
    </section>
  )
}

export default Hero
