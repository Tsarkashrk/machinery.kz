import DealerCard from '@/entities/dealer/ui/DealerCard'
import { useDealersList } from '@/entities/dealer/hooks/useDealersList'
import { IUser } from '@/types/user.type'

export const DealersList = () => {
  const { dealers, isLoading, error } = useDealersList()

  return (
    <div>
      {dealers.map((dealer: IUser) => (
        <DealerCard />
      ))}
    </div>
  )
}
