import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/backendApi";
import { getTokenFromCookie } from "@/App/store/reducers/authReducer/utils";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export interface RequestDeleteUserReview {
  bookId: string;
  personId: string;
}

export const deleteUserReview = createAsyncThunk<
  void,
  string,
  {
    rejectValue: RequestError;
  }
>("reviews/deleteUserReview", async (id, thunkAPI) => {
  try {
    await api.delete(`${QUERY.deleteUserReviewUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "application/json",
      },
    });
    return;
  } catch (e) {
    const error = e as AxiosError<RequestError>;
    if (error.response) {
      return thunkAPI.rejectWithValue({
        code: error.response.status,
        message:
          error.response.data?.message || "Не удалось удалить отзыв по книге",
        errorCode: error.response.data?.errorCode || "",
      });
    }
    return thunkAPI.rejectWithValue({
      code: 111,
      message: "Не удалось удалить отзыв по книге",
      errorCode: "",
    });
  }
});
