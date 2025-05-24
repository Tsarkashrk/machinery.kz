import { IBrand } from '../model/brand.model'
import { BrandCard } from './BrandCard'

type Props = {
  brands: IBrand[] | undefined
}

export const BrandsList = ({ brands }: Props) => {
  return (
    <div className="brand-list">
      {brands?.map((brand: IBrand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  )
}
