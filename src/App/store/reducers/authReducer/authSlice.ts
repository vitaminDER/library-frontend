import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { AuthSchema } from "@/App/store/reducers/authReducer/authSchema";
import { fetchAuth } from "@/App/store/reducers/authReducer/services/fetchAuth";
import { fetchAuthMe } from "@/App/store/reducers/authReducer/services/fetchAuthMe";
import { fetchRegistration } from "@/App/store/reducers/authReducer/services/fetchRegistration";
import { setTokenInCookie } from "@/App/store/reducers/authReducer/utils";
import { FetchStatus } from "@/App/store/storeTypes";

const initialState: AuthSchema = {
  authData: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    login: "",
    role: "ROLE_ADMIN",
    token: "",
    isAuth: true,
    // isAuth: false,
  },
  isRegistered: false,
  loadingAuth: FetchStatus.IDLE,
  loadingAuthMe: FetchStatus.IDLE,
  errorAuth: null,
  errorAuthMe: null,
  loadingRegistered: FetchStatus.IDLE,
  errorRegistered: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout(state) {
      Cookies.remove("token");
      state.authData = initialState.authData;
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
        if (action.payload.isAuth) {
          setTokenInCookie(action.payload.token);
          // if(state.authData.id){
          state.authData = action.payload;
          // }
        } else {
          Cookies.remove("token");
          state.authData = initialState.authData;
        }
        state.loadingAuthMe = FetchStatus.SUCCESS;
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        Cookies.remove("token");
        state.errorAuthMe = action.payload?.message?.toUpperCase();
        state.loadingAuthMe = FetchStatus.REJECTED;
      });
  },
});

export const authSliceAction = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
