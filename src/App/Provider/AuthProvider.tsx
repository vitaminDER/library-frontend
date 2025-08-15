import React, { JSX, useEffect } from "react";

import { getAuth } from "@/App/store/reducers/authReducer/authSelectors";
import { authSliceAction } from "@/App/store/reducers/authReducer/authSlice";
import { fetchAuthMe } from "@/App/store/reducers/authReducer/services/fetchAuthMe";
import { getTokenFromCookie } from "@/App/store/reducers/authReducer/utils";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";

interface AuthProviderProps {
  children: JSX.Element;
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { loadingAuthMe } = useAppSelector(getAuth);
  const token = getTokenFromCookie();
  const checkTimeInterval = 60 * 60 * 1000;

  useEffect(() => {
    if (token) {
      dispatch(fetchAuthMe());
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (token) {
        dispatch(fetchAuthMe());
      } else {
        dispatch(authSliceAction.setLogout());
        clearInterval(intervalId);
      }
    }, checkTimeInterval);
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
