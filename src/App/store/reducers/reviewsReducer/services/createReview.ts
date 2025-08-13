import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestError} from "@/App/store/storeTypes";
import {api} from "@/utils/api/api";
import {QUERY} from "@/App/store/backend/constants";
import type {AxiosError} from "axios";
import {RequestRegistration} from "@/App/store/reducers/authReducer/services/fetchRegistration";

export interface RequestReview {
    bookId: string;
    personId:string;
    comment:string;
}
export interface ResponseReview {
    id: string;
    comment:string;
    createdDate:string;
}

export const createReview = createAsyncThunk<
    ResponseReview,
    RequestReview,
    {
        rejectValue: RequestError;
    }
>("createReview", async (params, thunkAPI) => {
    try {
        const response = await api.post<ResponseReview>(
            QUERY.postReviewUrl,
            params
        );
        return response.data;
    } catch (e) {
        const error = e as AxiosError<RequestError>;
        if (error.response?.status === 400 && error.response?.data) {
            return thunkAPI?.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue({
            code: 111,
            message:
                error.response?.data.message || "Не удалось создать отзыв по книге",
            errorCode: "",
        });
    }
});