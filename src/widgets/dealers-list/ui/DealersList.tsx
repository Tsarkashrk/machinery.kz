'use client'

import { DealerCard } from '@/entities/dealer'
import { useDealersList } from '@/entities/dealer/hooks/useDealersList'
import { IUser } from '@/types/user.type'
import { useUsersList } from '@/entities/user'

export const DealersList = () => {
  const { users, isLoading, error } = useUsersList()

  return (
    <div>
      {users?.map((dealer: any) => (
        <DealerCard key={dealer.id} dealer={dealer} />
      ))}
    </div>
  )
}
