import { StarSvg } from "@/assets/StarSvg";

import { StarsContainer } from "./styles";

const countStar = 5;

interface RatingProps {
  rating: number;
}

export const Rating = (props: RatingProps) => {
  const { rating = 3 } = props;

  const starList = Array.from({ length: countStar }, (_, i) => i + 1).map(
    el => {
      return <StarSvg key={el} color={rating >= el ? "#ffd700" : "#fff"} />;
    }
  );

  return <StarsContainer>{starList}</StarsContainer>;
};
