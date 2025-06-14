import Link from "next/link";
import { ICategory } from "../model/category.model";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import Card from "@/6-shared/ui/Cards/Card/Card";
import { CategoryCard } from "./CategoryCard";

type Props = {
  categories: ICategory[];
  rowCount?: number;
  machinery?: boolean;
};

export const CategoryList = ({ categories, machinery }: Props) => {
  return (
    <div className={`category-list ${machinery && "category-list--machinery"}`}>
      {categories.map((category: ICategory) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
