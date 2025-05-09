export interface IReviewBase {
  rating: number
  comment: string
}

export interface IReview extends IReviewBase {
  id: number

  transaction_details: string
  rental_transaction_details: string
  reviewer_details: string

  created_at: string
}

export interface IReviewRequest extends IReviewBase {
  transaction: number
  rental_transaction: string
  reviewer: number
}
