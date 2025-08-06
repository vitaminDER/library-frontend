import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export interface Review {
  personId: string;
  username: string;
  comment: string;
  createdDate: string;
  evaluation: number;
}

export interface Reviews {
  content: Review[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ReviewsScheme {
  reviews: Reviews;
  loadingReviews: FetchStatus;
  errorReviews: Nullable<string>;
}
