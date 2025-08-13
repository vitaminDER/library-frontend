import React, {ChangeEvent, useState} from 'react';
import {
    ButtonBox,
    CreateReviewFormContainer,
    CreateReviewWrapper,
    ReviewHeader, TextAriaBox, TextAriaCount,
    TextAriaResize
} from "@/widgets/ui/CreateReview/ui/styles";
import {Button} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export const CreateReview = () => {
    const [isVisibleNewReview, setIsVisibleNewReview] = useState(false);
    const [textAria, setTextAria] = useState('')


    const handleChangeTextAria = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {value}= e.target;
        if(value.length <= 3000){
        setTextAria(value)
        }
    }

    const handleCloseReview = () => {
        setTextAria('');
        setIsVisibleNewReview(false);
    }
    const createReview = () => {
        setIsVisibleNewReview(false)
    }


    return (
        <CreateReviewWrapper isHover={!isVisibleNewReview}>
            {isVisibleNewReview ?
                <CreateReviewFormContainer>
                    <ReviewHeader>Ваш отзыв <ClearIcon fontSize={'small'} onClick={handleCloseReview}/></ReviewHeader>
                    <TextAriaBox>
                        <TextAriaCount>
                            <span>{textAria.length} / 3000</span>
                        </TextAriaCount>
                        <TextAriaResize
                        value={textAria}
                        onChange={(e) => handleChangeTextAria(e)}
                        placeholder="Введите комментарий"
                    /></TextAriaBox>
                    <ButtonBox>
                        <Button variant="outlined" onClick={createReview} size={'large'} disabled={textAria.length < 120 || textAria.length > 3000}>
                            Отправить
                        </Button>
                    </ButtonBox>
                </CreateReviewFormContainer> :
                <div onClick={() => setIsVisibleNewReview(true)}>Оставить отзыв</div>}

        </CreateReviewWrapper>
    );
};
