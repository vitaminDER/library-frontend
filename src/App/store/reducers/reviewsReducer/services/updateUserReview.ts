import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { getTokenFromCookie } from "@/App/store/reducers/authReducer/utils";
import { ResponseUserReview } from "@/App/store/reducers/reviewsReducer/services/fetchUserReview";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export interface RequestUpdateUserReview {
  bookId: string;
  personId: string;
  reviewId?: string | undefined;
  comment: string;
}

export const updateUserReview = createAsyncThunk<
  ResponseUserReview,
  RequestUpdateUserReview,
  {
    rejectValue: RequestError;
  }
>("updateUserReview", async (params, thunkAPI) => {
  try {
    const response = await api.put<ResponseUserReview>(
      QUERY.putUserReviewUrl,
      params,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          Accept: "application/json",
        },
      }
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
        error.response?.data.message || "Не удалось изменить отзыв о книге",
      errorCode: "",
    });
  }
});
