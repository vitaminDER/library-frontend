import {FetchStatus, Nullable} from "@/App/store/storeTypes";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
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
    loadingRegistered: FetchStatus;
    errorAuth: Nullable<string> | undefined;
    errorRegistered: Nullable<string> | undefined;
}
