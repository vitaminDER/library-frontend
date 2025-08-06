import { createSlice } from "@reduxjs/toolkit";

import { UserPreferenceScheme } from "@/App/store/reducers/userPreference/userPreferenceScheme";

const initialState: UserPreferenceScheme = {
  preference: "preference",
};

export const userPreferenceSlice = createSlice({
  name: "userPreference",
  initialState,
  reducers: {},
});

export const userPreferenceSliceReducer = userPreferenceSlice.reducer;
