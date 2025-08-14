import React, {createContext, JSX, useContext, useEffect, useState} from 'react';
import {getTokenFromCookie} from "@/App/store/reducers/authReducer/utils";
import {useAppDispatch, useAppSelector} from "@/App/store/storeHooks";
import {fetchAuthMe} from "@/App/store/reducers/authReducer/services/fetchAuthMe";
import {getAuth} from "@/App/store/reducers/authReducer/authSelectors";
import {FetchStatus} from "@/App/store/storeTypes";
import {CircularProgress} from "@mui/material";
import {authSliceAction} from "@/App/store/reducers/authReducer/authSlice";

interface AuthProviderProps {
    children: JSX.Element;
}

const AuthProvider = (props: AuthProviderProps) => {
    const {children} = props;
    const dispatch = useAppDispatch();
    const {loadingAuthMe} = useAppSelector(getAuth);
    const token = getTokenFromCookie();
    const checkTimeInterval = 30 * 60 * 1000;

    useEffect(() => {
        if (token) {
            dispatch(fetchAuthMe());
        }
    }, []);


    useEffect(() => {
        const intervalId = setInterval(()=>{
            if(token){
                dispatch(fetchAuthMe());
            }else {
                dispatch(authSliceAction.setLogout());
                clearInterval(intervalId);
            }
        }, 3000);

    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider