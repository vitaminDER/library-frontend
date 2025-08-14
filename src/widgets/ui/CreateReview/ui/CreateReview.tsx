import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {
    ButtonBox,
    CreateReviewFormContainer,
    CreateReviewWrapper,
    ReviewHeader, TextAriaBox, TextAriaCount,
    TextAriaResize
} from "@/widgets/ui/CreateReview/ui/styles";
import {Button} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {fetchUserReview, RequestUserReview} from "@/App/store/reducers/reviewsReducer/services/fetchUserReview";
import {useAuth} from "@/App/store/hooks/useAuth";
import {useAppDispatch, useAppSelector} from "@/App/store/storeHooks";
import {getReviews} from "@/App/store/reducers/reviewsReducer/selectors";
import {getItemBookSelector} from "@/App/store/reducers/bookItemReducer/selectors";
import {createReview, RequestReview} from "@/App/store/reducers/reviewsReducer/services/createReview";
import {clearUserReview} from "@/App/store/reducers/reviewsReducer/reviewsSlice";
import {FetchStatus} from "@/App/store/storeTypes";

export const CreateReview = () => {
    const userAuthData = useAuth();
    const dispatch = useAppDispatch();
    const {book} = useAppSelector(getItemBookSelector);
    const {userReview, loadingUserReview} = useAppSelector(getReviews);
    const [isVisibleNewReview, setIsVisibleNewReview] = useState(false);
    const [comment, setComment] = useState('')


    const handleChangeTextAria = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;
        if (value.length <= 3000) {
            setComment(value)
        }
    }

    const handleCloseReview = () => {
        setComment('');
        setIsVisibleNewReview(false);
    }
    const handleCreateReview = useCallback(() => {
        if (userAuthData.id) {

            const requestCreateUserReview: RequestReview = {
                bookId: book.id,
                personId: userAuthData.id.toString(),
                comment: comment
            }
            dispatch(createReview(requestCreateUserReview))
            setIsVisibleNewReview(false);
        }
    }, [comment])

    const deleteReviewHandler = ()=>{
        dispatch(clearUserReview())
    }

    useEffect(() => {
        if (userAuthData.id) {
            const requestUserReview: RequestUserReview = {
                bookId: book.id,
                personId: userAuthData.id.toString(),
            }
            dispatch(fetchUserReview(requestUserReview));
        }
    }, []);


    useEffect(() => {
        if(loadingUserReview === FetchStatus.SUCCESS){
        setComment(userReview.comment)

        }
    }, [userReview ]);

    return (
        <CreateReviewWrapper isHover={!isVisibleNewReview}>
            {isVisibleNewReview ?
                <CreateReviewFormContainer>
                    <ReviewHeader>Ваш отзыв <ClearIcon fontSize={'small'} onClick={handleCloseReview}/></ReviewHeader>
                    <TextAriaBox>
                        <TextAriaCount>
                            <span>{comment.length} / 3000</span>
                        </TextAriaCount>
                        <TextAriaResize
                            value={comment}
                            onChange={(e) => handleChangeTextAria(e)}
                            placeholder="Введите комментарий"
                        /></TextAriaBox>
                    <ButtonBox>
                        <Button variant="outlined" onClick={handleCreateReview} size={'large'}
                                disabled={comment.length < 120 || comment.length > 3000}>
                            Отправить
                        </Button>
                    </ButtonBox>
                    <ButtonBox>
                        <Button variant="outlined" onClick={deleteReviewHandler} size={'large'}>
                            Удалить отзыв
                        </Button>
                    </ButtonBox>
                </CreateReviewFormContainer> :
                <div onClick={() => setIsVisibleNewReview(true)}>Оставить отзыв</div>}

        </CreateReviewWrapper>
    );
};
