import {FetchStatus, Nullable} from "@/App/store/storeTypes";

export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
}
export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface AuthData {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    userName: string | null;
    login: string;
    role: Role
    token: string;
    isAuth: boolean;
}

// export interface AuthData {
//   id: string;
//   login: string;
//   role: UserRole[];
//   isAuth: boolean;
//   isRegistered: boolean;
// }

export interface AuthSchema {
    authData: AuthData;
    isRegistered:boolean;
    loadingAuth: FetchStatus;
    loadingAuthMe: FetchStatus;
    loadingRegistered: FetchStatus;
    errorAuth: Nullable<string> | undefined;
    errorRegistered: Nullable<string> | undefined;
    errorAuthMe: Nullable<string> | undefined;
}
