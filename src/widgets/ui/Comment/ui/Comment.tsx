import { Review } from "@/App/store/reducers/reviewsReducer/reviewsScheme";
import { Rating } from "@/shared/Rating";

import {
  DateContainer,
  ReviewContainer,
  ReviewInfo,
  ReviewTextComment,
} from "./styles";

interface CommentProps {
  review: Review;
}

export const Comment = (props: CommentProps) => {
  const { review } = props;
  return (
    <ReviewContainer key={review.personId}>
      <ReviewInfo>
        <Rating rating={review.evaluation} />
        {review.username}
      </ReviewInfo>
      <ReviewTextComment>
        <div>{review.comment}</div>
        <DateContainer>{review.createdDate}</DateContainer>
      </ReviewTextComment>
    </ReviewContainer>
  );
};
