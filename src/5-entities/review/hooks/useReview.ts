import { reviewApi } from '@/6-shared/api/review.api';
import { useMutation } from '@tanstack/react-query';
import { IReviewRequest } from '../model/review.model';


export const useReview = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: IReviewRequest) => reviewApi.sendReview(data),
  });

  return { mutate, isPending, error };
};
