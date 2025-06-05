import { Metadata } from "next";
import BrandsSlug from "./BrandsSlug";
import React from "react";

export const metadata: Metadata = {
  title: "Brand",
};

const BrandsSlugPage = () => {
  return <BrandsSlug />;
};

export default BrandsSlugPage;
