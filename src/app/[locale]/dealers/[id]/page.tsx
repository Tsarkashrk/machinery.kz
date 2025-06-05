import { Metadata } from "next";
import { DealerSlug } from "./DealerSlug";

export const metadata: Metadata = {
  title: "Dealer",
};

const DealerPage = () => {
  return <DealerSlug />;
};

export default DealerPage;
