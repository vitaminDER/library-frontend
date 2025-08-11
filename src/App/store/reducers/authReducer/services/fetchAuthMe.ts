import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthData} from "@/App/store/reducers/authReducer/authSchema";
import {RequestError} from "@/App/store/storeTypes";
import {api} from "@/utils/api/api";
import {QUERY} from "@/App/store/backend/constants";
import type {AxiosError} from "axios";
import {RequestAuth} from "@/App/store/reducers/authReducer/services/fetchAuth";
import {getTokenFromCookie} from "@/App/store/reducers/authReducer/utils";


export const fetchAuthMe = createAsyncThunk<
    AuthData,
    void,
    {
        rejectValue: RequestError;
    }
>("fetchAuthMe", async (_, thunkAPI) => {
    try {
        const response = await api.get<AuthData>(QUERY.getAuthMeUrl, {headers: {
                Authorization: `Bearer ${getTokenFromCookie()}`,
                Accept: 'application/json'
            }});
        return response.data;
    } catch (e) {
        const error = e as AxiosError<RequestError>;
        if (error.response?.status === 400 && error.response?.data) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
        return thunkAPI.rejectWithValue({
            code: 111,
            message:
                error.response?.data.message || "Не удалось получить список книг",
            errorCode: "",
        });
    }
});