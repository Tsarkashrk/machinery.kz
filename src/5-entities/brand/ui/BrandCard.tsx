import { useLocale } from "next-intl";
import { IBrand } from "../model/brand.model";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import Link from "next/link";
import Image from "next/image";

type Props = {
  brand: IBrand;
};

export const BrandCard = ({ brand }: Props) => {
  const locale = useLocale();

  return (
    <Link
      href={`${PLATFORM_PAGES.BRANDS}/${brand.name}`}
      className={`brand-card`}
    >
      {/* <div className="brand-card__info">
        <h3 className="brand-card__name">{locale === 'ru' ? brand.name : brand.description}</h3>
      </div> */}
      <Image
        src={brand.file}
        alt={brand.name}
        className="brand-card__image"
        width={400}
        height={400}
      />
    </Link>
  );
};
