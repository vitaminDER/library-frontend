import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { getTokenFromCookie } from "@/App/store/reducers/authReducer/utils";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export interface RequestCreateNewBook {
  bookName: string;
  authorName: string;
  year: string;
  genre: string[];
  imageUrl: string;
  description: string;
}

export const createNewBook = createAsyncThunk<
  void,
  RequestCreateNewBook,
  {
    rejectValue: RequestError;
  }
>("createNewBook", async (params, thunkAPI) => {
  try {
    await api.post(QUERY.createNewBookUrl, params, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "application/json",
      },
    });
  } catch (e) {
    const error = e as AxiosError<RequestError>;
    if (error.response?.status === 400 && error.response?.data) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
    return thunkAPI.rejectWithValue({
      code: 111,
      message:
        error.response?.data.message || "Не удалось получить список книг",
      errorCode: "",
    });
  }
});
