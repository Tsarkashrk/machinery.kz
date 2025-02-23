// 'use client'

// import Card from '@/components/Cards/Card/Card'
// import { useEquipmentCategories } from '@/services/equipment-categories.service'
// import Link from 'next/link'
// import React from 'react'

// const CatalogSection = () => {
//   const { data: categories, isLoading, isError } = useEquipmentCategories()

//   if (isLoading) return <p>Loading categories...</p>
//   if (isError) return <p>Error loading categories</p>

//   return (
//     <section className="catalog-section">
//       <div className="catalog-section__wrapper">
//         <h1 className="catalog-section__title">Catalog</h1>
//         <div className="catalog-section__categories">
//           {categories.map((item: any) => (
//             <Link key={item.id} href={`/catalog/${item.id}`} className="catalog-section__link">
//               <Card>
//                 <div className="catalog-section__item">
//                   <img className="catalog-section__img" src={item.image} alt={item.name} />
//                   <h3>{item.name}</h3>
//                 </div>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CatalogSection

'use client'

import Card from '@/components/Cards/Card/Card'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { categoriesService } from '@/services/categories'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

const CatalogSection = () => {
  return (
    <section className="catalog-section">
      <div className="catalog-section__wrapper">
        <h1 className="catalog-section__title">Catalog</h1>
        <div className="catalog-section__categories">
          {catalogItems.map((item) => (
            <Link key={item.link} href={`${PLATFORM_PAGES.CATALOG}/${item.link}`} className="catalog-section__link">
              <Card>
                <div className="catalog-section__item">
                  <img className="catalog-section__img" src={item.img} alt="" />
                  <h3>{item.title}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CatalogSection
