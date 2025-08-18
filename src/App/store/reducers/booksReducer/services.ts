import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/backendApi";
import { IBooks } from "@/App/store/reducers/booksReducer/booksScheme";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export const fetchBooks = createAsyncThunk<
  IBooks[],
  void,
  {
    rejectValue: RequestError;
  }
>("fetchBooks", async (_, thunkAPI) => {
  try {
    const response = await api.get<IBooks[]>(QUERY.getBooksUrl);
    return response.data;
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
