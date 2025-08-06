import { getReviews } from "@/App/store/reducers/reviewsReducer/selectors";
import { useAppSelector } from "@/App/store/storeHooks";
import { Rating } from "@/widgets/ui/Rating";

import {
  DateContainer,
  ReviewContainer,
  ReviewInfo,
  ReviewTextComment,
  ReviewWrapper,
} from "./styles";

export const Review = () => {
  const { reviews } = useAppSelector(getReviews);

  const reviewsList = reviews?.content.map(review => {
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
  });

  return <ReviewWrapper>{reviewsList}</ReviewWrapper>;
};
