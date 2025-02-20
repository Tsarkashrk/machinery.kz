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
    title: 'Power tools',
    img: 'assets/cat1-d.webp',
    link: 'power-tools',
  },
  {
    title: 'Generators',
    img: 'assets/cat2-d.webp',
    link: 'generators',
  },
  {
    title: 'Compressors',
    img: 'assets/cat3-d.webp',
    link: 'compressors',
  },
  {
    title: 'Generators',
    img: 'assets/cat2-d.webp',
    link: 'generators2',
  },
  {
    title: 'Welding equipment',
    img: 'assets/cat4-d.webp',
    link: 'welding-equipment2',
  },
  {
    title: 'Compressors',
    img: 'assets/cat3-d.webp',
    link: 'compressors2',
  },
]

const CatalogSection = () => {
  return (
    <section className="catalog-section">
      <div className="catalog-section__wrapper">
        <h1 className="catalog-section__title">Catalog</h1>
        <div className="catalog-section__categories">
          {catalogItems.map((item) => (
            <Link key={item.link} href={`catalog/${item.link}`} className="catalog-section__link">
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
