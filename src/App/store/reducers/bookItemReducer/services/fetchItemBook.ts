import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { BookItem } from "@/App/store/reducers/bookItemReducer/bookItemSheme";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

interface RequestBook {
  id: string | undefined;
}

export const fetchItemBook = createAsyncThunk<
  BookItem,
  RequestBook,
  {
    rejectValue: RequestError;
  }
>("fetchItemBook", async (params, thunkAPI) => {
  try {
    const response = await api.get<BookItem>(QUERY.getItemBookUrl, { params });
    return response.data;
  } catch (e) {
    const error = e as AxiosError<RequestError>;
    if (error.response?.status === 400 && error.response?.data) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
    return thunkAPI.rejectWithValue({
      code: 111,
      message:
        error.response?.data.message ||
        "Не удалось получит информацию по книге",
      errorCode: "",
    });
  }
});
