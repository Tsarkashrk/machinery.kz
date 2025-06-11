import { IUser } from '@/5-entities/user';
import React from 'react';
import Image from 'next/image';
import { Title } from '@/6-shared/ui/Title/Title';
import { ICompanyResponse } from '@/5-entities/company';
import { Description } from '@/6-shared/ui/Description/Description';
import Link from 'next/link';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';

type Props = {
  userDealer?: IUser;
  companyDealer?: ICompanyResponse;
};

export const DealerCard = ({ userDealer, companyDealer }: Props) => {
  console.log(userDealer);

  return (
    <Link
      className="dealer-card"
      href={`${PLATFORM_PAGES.DEALERS}/${userDealer ? userDealer?.id : companyDealer?.id}`}
    >
      <div className="dealer-card__wrapper">
        <Image
          className="dealer-card__image"
          width={300}
          height={300}
          src="/assets/profile-placeholder.png"
          alt={'profile image'}
        />
        <div className="dealer-card__info">
          <Title
            fontWeight="600"
            size="h3"
          >
            {userDealer?.first_name} {userDealer?.last_name}
          </Title>
          <Description>
            {userDealer?.email || companyDealer?.founded_year}
          </Description>
        </div>
      </div>
    </Link>
  );
};
