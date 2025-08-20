import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/backendApi";
import { ResponseBooksData } from "@/App/store/reducers/adminReducer/adminSchema";
import { getTokenFromCookie } from "@/App/store/reducers/authReducer/utils";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export type SearchType = "TITLE" | "AUTHOR" | "ISBN";

export interface RequestAdminBooks {
  searchValue: string;
  typeSearch: string;
  pageNumber: number;
  pageSize: number;
}

export const fetchAdminBooks = createAsyncThunk<
  ResponseBooksData,
  RequestAdminBooks,
  {
    rejectValue: RequestError;
  }
>("fetchAdminBooks", async (params, thunkAPI) => {
  try {
    const response = await api.get<ResponseBooksData>(QUERY.getAdminBooksUrl, {
      params,
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: "application/json",
      },
    });
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
      message: error.response.data?.message || "Не удалось получить  книги",
      errorCode: error.response.data?.errorCode || "",
    });
  }
});
