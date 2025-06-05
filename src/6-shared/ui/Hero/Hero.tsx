"use client";

import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import Carousel from "../Carousel/Carousel";

const carouselItems = [
  {
    img: "/assets/Dewalt1.webp",
    title: "Super price",
    description: "example desc",
    link: `${PLATFORM_PAGES.BRANDS}/DeWalt`,
    price: "34.000",
  },
  {
    img: "/assets/Bosch2.jpg",
    title: "Super price",
    description: "example desc",
    link: `${PLATFORM_PAGES.BRANDS}/Bosch`,
    price: "34.000",
  },
  {
    img: "/assets/Stanley1.jpg",
    title: "Super price",
    description: "example desc",
    link: `${PLATFORM_PAGES.BRANDS}/Alteco`,
    price: "34.000",
  },
];

const carouselItems2 = [
  {
    img: "/assets/CatBanner.jpg",
    title: "Super price",
    description: "example desc",
    link: `${PLATFORM_PAGES.BRANDS}/Cat`,
    price: "34.000",
  },
];

// const carouselItems2 = [
//   {
//     img: '/assets/Dewalt1.webp',
//     title: 'Super price',
//     description: 'example desc',
//     link: `${PLATFORM_PAGES.BRANDS}/DeWalt`,
//     price: '34.000',
//   },
//   {
//     img: '/assets/Bosch2.jpg',
//     title: 'Super price',
//     description: 'example desc',
//     link: `${PLATFORM_PAGES.BRANDS}/Bosch`,
//     price: '34.000',
//   },
//   {
//     img: '/assets/Stanley1.jpg',
//     title: 'Super price',
//     description: 'example desc',
//     link: `${PLATFORM_PAGES.BRANDS}/Alteco`,
//     price: '34.000',
//   },
// ]

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__sliders">
          <Carousel carouselItems={carouselItems} variant="banner" />
          <Carousel carouselItems={carouselItems2} variant="banner" />
        </div>
      </div>
    </section>
  );
};
