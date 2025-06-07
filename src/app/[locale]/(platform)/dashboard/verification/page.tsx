import { Metadata } from "next";
import { VerificationSection } from "./VerificationSection";

export const metadata: Metadata = {
  title: "Верификация",
};

const VerificationPage = () => {
  return <VerificationSection />;
};

export default VerificationPage;
