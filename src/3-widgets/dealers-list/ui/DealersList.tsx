"use client";

import { ICompanyResponse } from "@/5-entities/company";
import { DealerCard, useDealersList } from "@/5-entities/dealer";
import { IUser } from "@/5-entities/user";

type Props = {
  companies: ICompanyResponse[];
  users: IUser[];
};

export const DealersList = ({ companies, users }: Props) => {
  return (
    <div className="dealer-list">
      <div className="dealer-list__wrapper">
        {companies?.map((dealer: ICompanyResponse) => (
          <DealerCard key={dealer.id} companyDealer={dealer} />
        ))}
        {users?.map((dealer: IUser) => (
          <DealerCard key={dealer.id} userDealer={dealer} />
        ))}
      </div>
    </div>
  );
};
