import { ReactNode } from 'react'
import { useToggleFavorite } from '../model/useToggleFavorite'
import Button from '@/6-shared/ui/Buttons/Button'
import { Heart } from 'lucide-react'

type Props = {
  productId: number
  isFavorite: boolean
}

export const ToggleFavoriteButton: React.FC<Props> = ({ productId }) => {
  const { mutate, isPending } = useToggleFavorite()

  const handleClick = () => {
    mutate(productId)
  }

  return (
    <button className="favorite-button" onClick={handleClick}>
      <Heart className='favorite-button__icon' size={22} />
    </button>
  )
}
