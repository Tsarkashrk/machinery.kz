'use client';

import { Title } from '@/6-shared/ui/Title/Title';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface IRoute {
  name: string;
  path: string;
  icon: ReactNode;
}

type Props = {
  title?: string;
  routes: IRoute[];
};

export const ProfileSidebarList = ({ routes, title }: Props) => {
  const pathname = usePathname();

  const removeLocalePrefix = (path: string) => {
    return path.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
  };

  const isRouteActive = (routePath: string) => {
    const cleanPathname = removeLocalePrefix(pathname);
    const cleanRoutePath = removeLocalePrefix(routePath);

    if (cleanRoutePath === '/profile') {
      return cleanPathname === '/profile';
    }

    return cleanPathname === cleanRoutePath;
  };

  return (
    <div className="profile-sidebar-list">
      <div className="profile-sidebar-list__title">
        <Title
          fontSize="14px"
          fontFamily="geist"
          fontWeight="500"
          color="gray"
        >
          {title}
        </Title>
      </div>
      <ul className="profile-sidebar-list__list">
        {routes.map((route) => {
          const isActive = isRouteActive(route.path);

          return (
            <Link
              key={route.path}
              href={route.path}
              className={`profile-sidebar-list__route ${isActive ? 'profile-sidebar-list__route--active' : ''}`}
            >
              {route.icon}
              {route.name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
