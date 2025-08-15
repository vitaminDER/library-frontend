import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { Reviews } from "@/App/store/reducers/reviewsReducer/reviewsScheme";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

interface RequestReviews {
  bookId: string;
  pageNumber: number;
  pageSize: number;
}

export const fetchReviews = createAsyncThunk<
  Reviews,
  RequestReviews,
  {
    rejectValue: RequestError;
  }
>("fetchReviews", async (params, thunkAPI) => {
  try {
    const response = await api.get<Reviews>(QUERY.getReviewsUrl, { params });
    return response.data;
  } catch (e) {
    const error = e as AxiosError<RequestError>;
    if (!error.response) {
      return thunkAPI.rejectWithValue({
        code: 0,
        message: "Network error",
        errorCode: "NETWORK_ERROR",
      });
    }

    if (error.response.status === 400 && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data);
    }

    return thunkAPI.rejectWithValue({
      code: error.response.status || 111,
      message:
        error.response.data?.message || "Не удалось получить отзывы по книге",
      errorCode: error.response.data?.errorCode || "",
    });
  }
});
