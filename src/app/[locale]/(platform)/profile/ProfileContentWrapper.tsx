'use client';

import { PROFILE_PAGES } from '@/6-shared/config/pages-url.config';
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const pathToTranslationKeyMap: Record<string, string> = {
  [PROFILE_PAGES.PUBLICATIONS]: 'ProfilePublicationsPage',
  [PROFILE_PAGES.ORDERS]: 'ProfileOrdersPage',
  [PROFILE_PAGES.SETTINGS]: 'ProfileSettingsPage',
};

export const ProfileContentWrapper = ({ children }: Props) => {
  const pathname = usePathname();

  const matchedKey = Object.entries(pathToTranslationKeyMap).find(([path]) =>
    pathname.includes(path),
  )?.[1];

  const t = useTranslations(matchedKey ?? 'ProfilePage');

  return (
    <div className="content">
      <div className="content__wrapper">
        <SectionWithContent>
          <Title>{t('title')}</Title>
          <div className="content__card">{children}</div>
        </SectionWithContent>
      </div>
    </div>
  );
};
