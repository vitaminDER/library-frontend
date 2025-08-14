import { RootState } from "@/App/store/store";

export const getReviews = (state: RootState) => state.reviews;
export const getUserReview = (state: RootState) => state.reviews?.userReview;
