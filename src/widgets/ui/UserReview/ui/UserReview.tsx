import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import { getItemBookSelector } from "@/App/store/reducers/bookItemReducer/selectors";
import { getReviews } from "@/App/store/reducers/reviewsReducer/selectors";
import { createReview } from "@/App/store/reducers/reviewsReducer/services/createReview";
import { deleteUserReview } from "@/App/store/reducers/reviewsReducer/services/deleteUserReview";
import { updateUserReview } from "@/App/store/reducers/reviewsReducer/services/updateUserReview";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import {
  ButtonBox,
  CreateReviewFormContainer,
  CreateReviewWrapper,
  ReviewHeader,
  ReviewHeaderButton,
  TextAriaBox,
  TextAriaCount,
  TextAriaResize,
} from "@/widgets/ui/UserReview/ui/styles";

export const UserReview = () => {
  const userAuthData = useAuth();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector(getItemBookSelector);
  const { id } = useParams();
  const bookId: string = id ? id.slice(1) : "";
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
      const requestCreateUserReview = {
        ...(userReview.reviewId && { reviewId: userReview.reviewId }),
        bookId: bookId,
        personId: userAuthData.id,
        comment: comment,
      };
      if (userReview.reviewId) {
        dispatch(updateUserReview(requestCreateUserReview));
      } else {
        dispatch(createReview(requestCreateUserReview));
      }

      setIsVisibleNewReview(false);
    }
  }, [bookId, comment, dispatch, userAuthData.id, userReview.reviewId]);

  const deleteReviewHandler = () => {
    if (loadingUserReview === FetchStatus.SUCCESS) {
      dispatch(deleteUserReview(userReview.reviewId));
    }
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
              disabled={!userReview.comment}
              onClick={deleteReviewHandler}
            >
              Удалить отзыв
            </Button>
            <Button
              variant="outlined"
              size={"large"}
              disabled={comment.length < 10}
              onClick={handleCreateReview}
            >
              Отправить
            </Button>
          </ButtonBox>
        </CreateReviewFormContainer>
      ) : (
        <ReviewHeaderButton
          onClick={() => {
            setIsVisibleNewReview(true);
          }}
        >
          Оставить отзыв
        </ReviewHeaderButton>
      )}
    </CreateReviewWrapper>
  );
};
