import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/constants";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export interface RequestProfile {
  userId: string;
}

export interface ResponseProfile {
  id: string;
  login: string;
}

export const fetchProfile = createAsyncThunk<
  ResponseProfile,
  RequestProfile,
  {
    rejectValue: RequestError;
  }
>("fetchProfile", async (params, thunkAPI) => {
  try {
    const response = await api.get<ResponseProfile>(
      QUERY.getProfileUrl,
      params
    );
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
        "Не удалось получить информацию по профилю",
      errorCode: "",
    });
  }
});
