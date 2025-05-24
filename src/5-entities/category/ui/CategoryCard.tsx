import { useLocale } from 'next-intl'
import { ICategory } from '../model/category.model'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  category: ICategory
}

export const CategoryCard = ({ category }: Props) => {
  const locale = useLocale()

  return (
    <Link href={`${PLATFORM_PAGES.CATEGORIES}/${category.name}`} className={`category-card ${(category.id === 7 || category.id === 20) && 'category-card--doubled'}`}>
      <div className="category-card__info">
        <h3 className="category-card__name">{locale === 'ru' ? category.name : category.description}</h3>
      </div>
      <div className="category-card__image-container">
        <Image src={`/assets/cat${category.id}-d.webp`} alt={category.name} className="category-card__image" width={400} height={400} />
      </div>
    </Link>
  )
}
