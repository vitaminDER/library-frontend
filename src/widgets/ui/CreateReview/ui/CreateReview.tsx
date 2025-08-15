import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import { getItemBookSelector } from "@/App/store/reducers/bookItemReducer/selectors";
import { clearUserReview } from "@/App/store/reducers/reviewsReducer/reviewsSlice";
import { getReviews } from "@/App/store/reducers/reviewsReducer/selectors";
import {
  createReview,
  RequestReview,
} from "@/App/store/reducers/reviewsReducer/services/createReview";
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
  const bookId = id?.slice(1);
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
          bookId: book.id,
          personId: userAuthData.id.toString(),
          comment: comment,
        };
        dispatch(createReview(requestCreateUserReview));
        setIsVisibleNewReview(false);
      }
    }
  }, [book.id, comment, dispatch, userAuthData.id]);

  const deleteReviewHandler = () => {
    dispatch(clearUserReview());
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
              disabled={comment.length < 120 || comment.length > 3000}
              onClick={handleCreateReview}
            >
              Отправить
            </Button>
          </ButtonBox>
          <ButtonBox>
            <Button
              variant="outlined"
              size={"large"}
              onClick={deleteReviewHandler}
            >
              Удалить отзыв
            </Button>
          </ButtonBox>
        </CreateReviewFormContainer>
      ) : (
        <div onClick={() => setIsVisibleNewReview(true)}>Оставить отзыв</div>
      )}
    </CreateReviewWrapper>
  );
};
