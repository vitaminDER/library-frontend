import React, {JSX, useEffect} from 'react';
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

    useEffect(() => {
        if (token) {
            dispatch(fetchAuthMe());
        }
    }, []);


    useEffect(() => {
        // const token = getTokenFromCookie();
            if (token) {
        setInterval(() => {
                dispatch(fetchAuthMe());
        }, 30000);
            }else {
                dispatch(authSliceAction.setLogout())
            }
        // const intervalId = setInterval(checkAuth, 30000);
        //
        // function stopPeriodicTask() {
        //     clearInterval(intervalId);
        //     console.log("Периодическая задача остановлена");
        // }
        // setTimeout(stopPeriodicTask, 120000);

    }, []);

    return (
        <>
            {loadingAuthMe === FetchStatus.PENDING ? <CircularProgress size="30px"/> : children}
        </>
    );
};

export default AuthProvider