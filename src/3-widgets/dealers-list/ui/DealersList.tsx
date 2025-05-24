'use client'

import { ICompany } from '@/5-entities/company'
import { DealerCard, useDealersList } from '@/5-entities/dealer'
import { IUser } from '@/5-entities/user'

type Props = {
  companies: ICompany[]
  users: IUser[]
}

export const DealersList = ({ companies, users }: Props) => {
  return (
    <div className="dealer-list">
      <div className="dealer-list__wrapper">
        {companies?.map((dealer: ICompany) => (
          <DealerCard key={dealer.id} companyDealer={dealer} />
        ))}
        {users?.map((dealer: IUser) => (
          <DealerCard key={dealer.id} userDealer={dealer} />
        ))}
      </div>
    </div>
  )
}
