export interface IReviewsResponse {
  count: number;
  next: string;
  previous: string;
  results: IReviewResponse[];
}

export interface IReviewer {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IReviewResponse {
  id: number;
  transaction_details: any;
  rental_transaction_details: any;
  reviewer_details: IReviewer;
  rating: number;
  comment: string;
  created_at: string;
}

export interface IReviewRequest {
  transaction: number;
  rental_transaction: number;
  reviewer: number;
  rating: number;
  comment: string;
}
