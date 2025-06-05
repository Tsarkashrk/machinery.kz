import { Metadata } from "next";
import { CompaniesSection } from "./CompaniesSection";

export const metadata: Metadata = {
  title: "Компании",
};

const CompaniesPage = () => {
  return <CompaniesSection />;
};

export default CompaniesPage;
