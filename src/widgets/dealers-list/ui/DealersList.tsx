'use client'

import { DealerCard, useDealersList } from '@/entities/dealer'
import { useUsersList } from '@/entities/user'

export const DealersList = () => {
  const { dealers, isLoading, error } = useDealersList()

  return (
    <div>
      {dealers?.map((dealer: any) => (
        <DealerCard key={dealer.id} dealer={dealer} />
      ))}
    </div>
  )
}
