import React, {JSX, useEffect} from 'react';
import {getTokenFromCookie} from "@/App/store/reducers/authReducer/utils";
import {useAppDispatch, useAppSelector} from "@/App/store/storeHooks";
import {fetchAuthMe} from "@/App/store/reducers/authReducer/services/fetchAuthMe";
import {getAuth} from "@/App/store/reducers/authReducer/authSelectors";
import {FetchStatus} from "@/App/store/storeTypes";
import {CircularProgress} from "@mui/material";

interface AuthProviderProps {
    children: JSX.Element;
}

const AuthProvider = (props: AuthProviderProps) => {
    const {children} = props;
    const dispatch = useAppDispatch();
    const {loadingAuthMe} = useAppSelector(getAuth);

    useEffect(() => {
        if (getTokenFromCookie()) {
            dispatch(fetchAuthMe());
        }
    }, []);

    return (
        <>
            {loadingAuthMe === FetchStatus.PENDING ? <CircularProgress size="30px"/> : children}
        </>
    );
};

export default AuthProvider