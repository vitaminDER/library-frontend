import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProfileSchema } from "@/App/store/reducers/profileReducer/profileSchema";
import {
  fetchProfile,
  ResponseProfile,
} from "@/App/store/reducers/profileReducer/services/fetchProfile";
import { FetchStatus } from "@/App/store/storeTypes";

const initialState: ProfileSchema = {
  profile: {
    id: "",
    login: "",
  },
  loadingProfile: FetchStatus.IDLE,
  errorProfile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loadingProfile = FetchStatus.PENDING;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ResponseProfile>) => {
          state.profile = action.payload;
          state.loadingProfile = FetchStatus.SUCCESS;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.errorProfile = action.payload?.message?.toUpperCase();
        state.loadingProfile = FetchStatus.REJECTED;
      });
  },
});

export const {} = profileSlice.actions;
export const profileSliceReducer = profileSlice.reducer;
