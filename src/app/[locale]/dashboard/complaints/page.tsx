import { Metadata } from "next";
import { ComplaintsSection } from "./ComplaintsSection";

export const metadata: Metadata = {
  title: "Жалобы",
};

const ComplaintsPage = () => {
  return <ComplaintsSection />;
};

export default ComplaintsPage;
