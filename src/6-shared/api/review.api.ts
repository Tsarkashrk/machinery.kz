import {
  IReviewRequest,
  IReviewResponse,
  IReviewsResponse,
} from '@/5-entities/review/model/review.model';
import { axiosClassic, axiosWithAuth } from './interceptors';

const BASE_URL = '/reviews';

export const reviewApi = {
  async getAllReviews() {
    const response = await axiosWithAuth.get<IReviewsResponse>(`${BASE_URL}/`);
    return response.data;
  },

  async getReviewById(id: number) {
    const response = await axiosClassic.get<IReviewResponse>(
      `${BASE_URL}/${id}/`,
    );
    return response.data;
  },

  async sendReview(data: IReviewRequest) {
    const response = await axiosWithAuth.post(`${BASE_URL}/`, data);

    return response.data;
  },
};
