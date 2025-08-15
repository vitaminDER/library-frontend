import { ResponseUserReview } from "@/App/store/reducers/reviewsReducer/services/fetchUserReview";
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
  userReview: ResponseUserReview;
  loadingUserReview: FetchStatus;
  errorUserReview: Nullable<string> | undefined;
  loadingReviews: FetchStatus;
  errorReviews: Nullable<string>;
}
