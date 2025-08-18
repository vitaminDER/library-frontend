import { StarSvg } from "@/assets/StarSvg";
import { COUNT_STAR } from "@/shared/Rating/ui/constants";

import { StarsContainer } from "./styles";

interface RatingProps {
  rating: number;
}

export const Rating = (props: RatingProps) => {
  const { rating = 0 } = props;

  const starList = Array.from({ length: COUNT_STAR }, (_, i) => i + 1).map(
    el => {
      return <StarSvg key={el} color={rating >= el ? "#ffd700" : "#fff"} />;
    }
  );

  return <StarsContainer>{starList}</StarsContainer>;
};
