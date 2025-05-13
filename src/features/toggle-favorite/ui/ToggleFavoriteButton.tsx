import { ReactNode } from 'react'
import { useToggleFavorite } from '../model/useToggleFavorite'
import Button from '@/shared/ui/Buttons/Button'

type Props = {
  productId: number
  isFavorite: boolean
  children: ReactNode
}

export const ToggleFavoriteButton: React.FC<Props> = ({ productId, children }) => {
  const { mutate, isPending } = useToggleFavorite()

  const handleClick = () => {
    mutate(productId)
  }

  return <Button onClick={handleClick}>{children}</Button>
}
