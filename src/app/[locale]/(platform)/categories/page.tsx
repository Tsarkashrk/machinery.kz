import { Metadata } from "next";
import React from "react";
import CategoriesSection from "./CategoriesSection";

export const metadata: Metadata = {
  title: "Categories",
};

const CategoriesPage = () => {
  return <CategoriesSection />;
};

export default CategoriesPage;
