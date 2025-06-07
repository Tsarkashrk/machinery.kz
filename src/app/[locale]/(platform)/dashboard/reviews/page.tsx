import { Metadata } from "next";
import { ReviewsSection } from "./ReviewsSection";

export const metadata: Metadata = {
  title: "Отзывы",
};

const ReviewsPage = () => {
  return <ReviewsSection />;
};

export default ReviewsPage;
