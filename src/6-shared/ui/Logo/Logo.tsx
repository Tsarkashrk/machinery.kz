import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="logo" href={PLATFORM_PAGES.HOME}>
      MCHNRYKZ
    </Link>
  );
};
