"use client";

import { DASHBOARD_PAGES } from "@/6-shared/config/pages-url.config";
import { SectionWithContent } from "@/6-shared/ui/SectionWithContent/SectionWithContent";
import { Title } from "@/6-shared/ui/Title/Title";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const pathToTranslationKeyMap: Record<string, string> = {
  [DASHBOARD_PAGES.CATEGORIES]: "DashboardCategoriesPage",
  [DASHBOARD_PAGES.BRANDS]: "DashboardBrandsPage",
  [DASHBOARD_PAGES.USERS]: "DashboardUsersPage",
  [DASHBOARD_PAGES.COMPANIES]: "DashboardCompaniesPage",
  [DASHBOARD_PAGES.PUBLICATIONS]: "DashboardPublicationPage",
  [DASHBOARD_PAGES.VERIFICATION]: "DashboardVerificationPage",
  [DASHBOARD_PAGES.REVIEWS]: "DashboardReviewsPage",
  [DASHBOARD_PAGES.COMPLAINTS]: "DashboardComplaintsPage",
};

export const AdminContentWrapper = ({ children }: Props) => {
  const pathname = usePathname();

  const matchedKey = Object.entries(pathToTranslationKeyMap).find(([path]) =>
    pathname.includes(path),
  )?.[1];

  const t = useTranslations(matchedKey ?? "DashboardPage");

  return (
    <div className="content">
      <div className="content__wrapper">
        <SectionWithContent>
          <Title>{t("title")}</Title>
          <div className="content__card">{children}</div>
        </SectionWithContent>
      </div>
    </div>
  );
};
