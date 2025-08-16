import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import { getItemBookSelector } from "@/App/store/reducers/bookItemReducer/selectors";
import { getReviews } from "@/App/store/reducers/reviewsReducer/selectors";
import {
  createReview,
  RequestReview,
} from "@/App/store/reducers/reviewsReducer/services/createReview";
import { deleteUserReview } from "@/App/store/reducers/reviewsReducer/services/deleteUserReview";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import {
  ButtonBox,
  CreateReviewFormContainer,
  CreateReviewWrapper,
  ReviewHeader,
  TextAriaBox,
  TextAriaCount,
  TextAriaResize,
} from "@/widgets/ui/CreateReview/ui/styles";

export const CreateReview = () => {
  const userAuthData = useAuth();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector(getItemBookSelector);
  const { id } = useParams();
  const bookId = id ? id.slice(1) : "";
  const { userReview, loadingUserReview } = useAppSelector(getReviews);
  const [isVisibleNewReview, setIsVisibleNewReview] = useState(false);
  const [comment, setComment] = useState("");

  const handleChangeTextAria = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 3000) {
      setComment(value);
    }
  };

  const handleCloseReview = () => {
    setComment("");
    setIsVisibleNewReview(false);
  };

  const handleCreateReview = useCallback(() => {
    if (userAuthData.id) {
      if (bookId) {
        const requestCreateUserReview: RequestReview = {
          bookId: bookId,
          personId: userAuthData.id,
          comment: comment,
        };
        dispatch(createReview(requestCreateUserReview));
        setIsVisibleNewReview(false);
      }
    }
  }, [bookId, comment, dispatch, userAuthData.id]);

  const deleteReviewHandler = () => {
    if (loadingUserReview === FetchStatus.SUCCESS) {
      dispatch(deleteUserReview(userReview.reviewId));
    }
    // dispatch(clearUserReview());
  };

  useEffect(() => {
    if (loadingUserReview === FetchStatus.SUCCESS) {
      setComment(userReview.comment);
    }
  }, [loadingUserReview, userReview, book]);

  return (
    <CreateReviewWrapper isHover={!isVisibleNewReview}>
      {isVisibleNewReview ? (
        <CreateReviewFormContainer>
          <ReviewHeader>
            Ваш отзыв{" "}
            <ClearIcon fontSize={"small"} onClick={handleCloseReview} />
          </ReviewHeader>
          <TextAriaBox>
            <TextAriaCount>
              <span>{comment.length} / 3000</span>
            </TextAriaCount>
            <TextAriaResize
              value={comment}
              placeholder="Введите комментарий"
              onChange={e => handleChangeTextAria(e)}
            />
          </TextAriaBox>
          <ButtonBox>
            <Button
              variant="outlined"
              size={"large"}
              onClick={deleteReviewHandler}
            >
              Удалить отзыв
            </Button>
            <Button
              variant="outlined"
              size={"large"}
              disabled={comment.length < 120 || comment.length > 3000}
              onClick={handleCreateReview}
            >
              Отправить
            </Button>
          </ButtonBox>
        </CreateReviewFormContainer>
      ) : (
        <div
          onClick={() => {
            setIsVisibleNewReview(true);
          }}
        >
          Оставить отзыв
        </div>
      )}
    </CreateReviewWrapper>
  );
};
