import React from "react";
import ProductsSection from "./ProductsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Объявления",
};

export default function ProductPage() {
  return <ProductsSection />;
}
