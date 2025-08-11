import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import {
  AuthData,
  AuthSchema, Role,
  UserRole,
} from "@/App/store/reducers/authReducer/authSchema";
import { fetchAuth } from "@/App/store/reducers/authReducer/services/fetchAuth";
import { fetchRegistration } from "@/App/store/reducers/authReducer/services/fetchRegistration";
import { FetchStatus } from "@/App/store/storeTypes";
import {setTokenInCookie} from "@/App/store/reducers/authReducer/utils";
import {fetchAuthMe} from "@/App/store/reducers/authReducer/services/fetchAuthMe";
import Cookies from "js-cookie";

const initialState: AuthSchema = {
  authData: {
    id: null,
    firstName: null,
    lastName: null,
    email: '',
    userName:null,
    login: '',
    role: "ROLE_USER",
    token: '',
    isAuth: false,
  },
  isRegistered:false,
  loadingAuth: FetchStatus.IDLE,
  loadingAuthMe: FetchStatus.IDLE,
  errorAuth: null,
  errorAuthMe: null,
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
          state.errorAuth = null;
          state.loadingAuth = FetchStatus.PENDING;
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
          state.authData = action.payload;
          setTokenInCookie(action.payload.token);
          state.loadingAuth = FetchStatus.SUCCESS;
        })
        .addCase(fetchAuth.rejected, (state, action) => {
          state.errorAuth = action.payload?.message?.toUpperCase();
          state.loadingAuth = FetchStatus.REJECTED;
        });
      builder
        .addCase(fetchRegistration.pending, state => {
          state.errorRegistered = null;
          state.loadingRegistered = FetchStatus.PENDING;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
          state.isRegistered = action.payload.isRegistered;
          state.loadingRegistered = FetchStatus.SUCCESS;
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
          state.errorRegistered = action.payload?.message?.toUpperCase();
          state.loadingRegistered = FetchStatus.REJECTED;
        });
      builder
        .addCase(fetchAuthMe.pending, state => {
          state.errorAuthMe = null;
          state.loadingAuthMe = FetchStatus.PENDING;
        })
        .addCase(fetchAuthMe.fulfilled, (state, action) => {
          if(action.payload.isAuth){
            setTokenInCookie(action.payload.token);
          state.authData = action.payload;
          }else {
            Cookies.remove('auth_token');
            state.authData = initialState.authData
          }
          state.loadingAuthMe = FetchStatus.SUCCESS;
        })
        .addCase(fetchAuthMe.rejected, (state, action) => {
          state.errorAuthMe = action.payload?.message?.toUpperCase();
          state.loadingAuthMe = FetchStatus.REJECTED;
        });
    },
  }
);

export const { setLogout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
