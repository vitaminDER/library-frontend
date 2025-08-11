import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";
import {getTokenFromCookie} from "@/App/store/reducers/authReducer/utils";

export const deleteItemBook = createAsyncThunk<
  void,
  string,
  {
    rejectValue: RequestError;
  }
>("deleteItemBook", async (id, thunkAPI) => {
  try {
    await api.delete(`${QUERY.getBooksUrl}/${id}`, {headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        Accept: 'application/json'
      }});
    return;
  } catch (e) {
    const error = e as AxiosError<RequestError>;
    if (error.response?.status === 400 && error.response?.data) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue({
      code: 111,
      message: error.response?.data?.message || "Не удалось удалить книгу",
      errorCode: "",
    });
  }
});
