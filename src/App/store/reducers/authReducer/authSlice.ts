import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import {
  AuthData,
  AuthSchema,
  UserRole,
} from "@/App/store/reducers/authReducer/authSchema";
import { fetchAuth } from "@/App/store/reducers/authReducer/services/fetchAuth";
import { fetchRegistration } from "@/App/store/reducers/authReducer/services/fetchRegistration";
import { FetchStatus } from "@/App/store/storeTypes";

const initialState: AuthSchema = {
  authData: {
    id: "",
    login: "",
    role: [UserRole.ADMIN],
    isAuth: false,
    isRegistered: false,
  },
  loadingAuth: FetchStatus.IDLE,
  errorAuth: null,
  loadingRegistered: FetchStatus.IDLE,
  errorRegistered: null,
};

export const authSlice = createSlice<AuthSchema, SliceCaseReducers<AuthSchema>>(
  {
    name: "auth",
    initialState,
    reducers: {
      setLogout(state: AuthSchema, action: PayloadAction<AuthData>) {
        state.authData = action.payload;
      },
    },
    extraReducers: builder => {
      builder
        .addCase(fetchAuth.pending, state => {
          state.loadingAuth = FetchStatus.PENDING;
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
          state.authData.isAuth = action.payload.isAuth;
          state.loadingAuth = FetchStatus.SUCCESS;
        })
        .addCase(fetchAuth.rejected, (state, action) => {
          state.errorAuth = action.payload?.message?.toUpperCase();
          state.loadingAuth = FetchStatus.REJECTED;
        });
      builder
        .addCase(fetchRegistration.pending, state => {
          state.loadingRegistered = FetchStatus.PENDING;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
          state.authData.isRegistered = action.payload.isRegistered;
          state.loadingRegistered = FetchStatus.SUCCESS;
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
          state.errorRegistered = action.payload?.message?.toUpperCase();
          state.loadingRegistered = FetchStatus.REJECTED;
        });
    },
  }
);

export const { setLogout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
