import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AdminSchema } from "@/App/store/reducers/adminReducer/adminSchema";
import {
  fetchGenres,
  ResponseGenre,
} from "@/App/store/reducers/adminReducer/services/fetchGenres";
import { FetchStatus } from "@/App/store/storeTypes";

const initialState: AdminSchema = {
  data: null,
  genres: [],
  loadingStatusGenre: FetchStatus.IDLE,
  errorGenre: null,
};

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGenres.pending, state => {
        state.errorGenre = null;
        state.loadingStatusGenre = FetchStatus.PENDING;
      })
      .addCase(
        fetchGenres.fulfilled,
        (state, action: PayloadAction<ResponseGenre[]>) => {
          state.genres = action.payload;
          state.loadingStatusGenre = FetchStatus.SUCCESS;
        }
      )
      .addCase(fetchGenres.rejected, (state, action) => {
        state.errorGenre = action.payload?.message;
        state.loadingStatusGenre = FetchStatus.REJECTED;
      });
  },
});

export const adminSliceReducer = adminSlice.reducer;
