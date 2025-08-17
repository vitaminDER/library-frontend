import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ChangeEvent, useState } from "react";

import { setPagination } from "@/App/store/reducers/reviewsReducer/reviewsSlice";
import { getReviews } from "@/App/store/reducers/reviewsReducer/selectors";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import { Review } from "@/widgets/ui/Review";

import {
  AccordionCollapsed,
  AccordionUnCollapsed,
  PaginationContainer,
} from "./styles";

export const ReviewAllUsers = () => {
  const dispatch = useAppDispatch();
  const { reviews, loadingReviews } = useAppSelector(getReviews);
  const [isVisible, setIsVisible] = useState(false);
  const visibleHandler = () => {
    setIsVisible(prev => !prev);
  };
  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPagination(value));
  };

  return (
    <>
      <AccordionCollapsed onClick={visibleHandler}>
        <div>Отзывы</div>
        {loadingReviews === FetchStatus.PENDING && (
          <CircularProgress size="20px" />
        )}
        {isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </AccordionCollapsed>
      {isVisible && loadingReviews === FetchStatus.SUCCESS ? (
        <AccordionUnCollapsed>
          <Review />
          <PaginationContainer>
            <Pagination
              count={reviews.totalPages}
              page={reviews.pageNumber}
              size="small"
              onChange={handlePaginationChange}
            />
          </PaginationContainer>
        </AccordionUnCollapsed>
      ) : null}
    </>
  );
};
