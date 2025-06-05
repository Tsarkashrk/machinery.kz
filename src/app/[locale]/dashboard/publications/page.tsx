import { Metadata } from "next";
import { PublicationsSection } from "./PublicationsSection";

export const metadata: Metadata = {
  title: "Объявления",
};

const PublicationsPage = () => {
  return <PublicationsSection />;
};

export default PublicationsPage;
