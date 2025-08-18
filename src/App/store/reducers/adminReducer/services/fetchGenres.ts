import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { QUERY } from "@/App/store/backend/backendApi";
import { GenreKey } from "@/App/store/reducers/adminReducer/adminSchema";
import { RequestError } from "@/App/store/storeTypes";
import { api } from "@/utils/api/api";

export interface ResponseGenre {
  id: string;
  name: GenreKey;
}

export const fetchGenres = createAsyncThunk<
  ResponseGenre[],
  void,
  {
    rejectValue: RequestError;
  }
>("fetchGenres", async (_, thunkAPI) => {
  try {
    const response = await api.get<ResponseGenre[]>(QUERY.getGenreUrl);
    return response.data;
  } catch (e) {
    const error = e as AxiosError<RequestError>;
    if (error.response?.status === 400 && error.response?.data) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
    return thunkAPI.rejectWithValue({
      code: 111,
      message:
        error.response?.data.message || "Не удалось получить список жанров",
      errorCode: "",
    });
  }
});
