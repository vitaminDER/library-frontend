import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestError} from "@/App/store/storeTypes";
import {api} from "@/utils/api/api";
import {QUERY} from "@/App/store/backend/constants";
import {AxiosError} from "axios";


export interface RequestDeleteUserReview {
    bookId: string;
    personId:string;
}

export const deleteUserReview = createAsyncThunk<
    void,
    RequestDeleteUserReview,
    {
        rejectValue: RequestError;
    }
>("reviews/deleteUserReview", async (params: RequestDeleteUserReview, thunkAPI) => {
    try {
        await api.delete(
            QUERY.deleteUserReviewUrl,
            { params }
        );
        return;
    } catch (e) {
        const error = e as AxiosError<RequestError>;
        if (error.response) {
            return thunkAPI.rejectWithValue({
                code: error.response.status,
                message: error.response.data?.message || "Не удалось удалить отзыв по книге",
                errorCode: error.response.data?.errorCode || ""
            });
        }
        return thunkAPI.rejectWithValue({
            code: 111,
            message: "Не удалось удалить отзыв по книге",
            errorCode: ""
        });
    }
});