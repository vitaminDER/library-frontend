import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { getTokenFromCookie } from "@/App/store/reducers/authReducer/utils";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export interface RequestUserReview {
  bookId: string;
  personId: string;
}

export interface ResponseUserReview {
  bookId: number | null;
  personId: number | null;
  reviewId: number | null;
  comment: string;
  createdDate: string;
}

export const fetchUserReview = createAsyncThunk<
  ResponseUserReview,
  RequestUserReview,
  {
    rejectValue: RequestError;
  }
>("fetchUserReview", async (params, thunkAPI) => {
  try {
    const response = await api.get<ResponseUserReview>(QUERY.getUserReviewUrl, {
      params,
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "application/json",
      },
    });
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
