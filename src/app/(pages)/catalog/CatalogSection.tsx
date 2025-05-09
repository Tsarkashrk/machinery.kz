'use client'

import Card from '@/shared/components/Cards/Card/Card'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import { categoriesApi, useEquipmentCategories, equipmentApi, usersApi } from '@/shared/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const catalogItems = [
  {
    id: 1,
    title: 'Power tools',
    img: 'assets/cat1-d.webp',
    link: 'power-tools',
  },
  {
    id: 2,
    title: 'Generators',
    img: 'assets/cat2-d.webp',
    link: 'generators',
  },
  {
    id: 3,
    title: 'Compressors',
    img: 'assets/cat3-d.webp',
    link: 'compressors',
  },
  {
    id: 4,
    title: 'Welding equipment',
    img: 'assets/cat4-d.webp',
    link: 'welding-equipment',
  },
  {
    id: 5,
    title: 'Machines',
    img: 'assets/cat6-d.webp',
    link: 'machines',
  },
  {
    id: 6,
    title: 'Pumps and motor pumps',
    img: 'assets/cat7-d.webp',
    link: 'cleaning-equipment',
  },
  {
    id: 7,
    title: 'Gardening equipment and tools',
    img: 'assets/cat8-d.webp',
    link: 'gardening-equipment-and-tools',
  },
  {
    id: 8,
    title: 'Pumps and motor pumps',
    img: 'assets/cat9-d.webp',
    link: 'pumps-and-motor-pumps',
  },
  {
    id: 9,
    title: 'Сlimate equipment',
    img: 'assets/cat10-d.webp',
    link: 'climate-equipment',
  },
]

const equipImages = [
  {
    img: 'assets/eq1.webp',
  },
  {
    img: 'assets/eq2.webp',
  },
  {
    img: 'assets/eq3.webp',
  },
]

const CatalogSection = () => {
  const equipmentsData = useQuery({
    queryKey: ['equipment'],
    queryFn: () => equipmentApi.getAllEquipment(),
  })

  const catalogsData = useEquipmentCategories()

  console.log(catalogsData)
  if (equipmentsData.isLoading) {
    return <div>Loading...</div>
  }

  if (equipmentsData) {
    return (
      <section className="catalog-section">
        <div className="catalog-section__wrapper">
          <div className="catalog-section__block">
            <h1 className="catalog-section__title">Categories</h1>
            <div className="catalog-section__categories">
              {catalogsData?.data &&
                catalogsData.data.map((item: any, index: any) => (
                  <Link key={item.id} href={`${PLATFORM_PAGES.CATALOG}/${item.id}`} className="catalog-section__link">
                    <Card>
                      <div className="catalog-section__item">
                        <img className="catalog-section__img" src={catalogItems[index]?.img} alt="" />
                        <h3>{item.name}</h3>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
          <div className="catalog-section__block">
            <h1 className="catalog-section__title">Equipment Catalog</h1>
            <div className="catalog-section__categories">
              {equipmentsData?.data &&
                equipmentsData?.data?.map((item: any, index: any) => (
                  <Link key={item.id} href={`${PLATFORM_PAGES.PRODUCT}/${item.id}`} className="catalog-section__link">
                    <Card>
                      <div className="catalog-section__item">
                        <img className="catalog-section__img" src={equipImages[index]?.img} alt="" />
                        <h3>{item.name}</h3>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default CatalogSection
