import { reviewApi } from '@/6-shared/api/review.api';
import { useQuery } from '@tanstack/react-query';

export const useReviewList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => {
      reviewApi.getAllReviews();
    },
  });

  return { reviews: data, isLoading, error };
};
