import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface AuthData {
  id: string;
  login: string;
  role: UserRole[];
  isAuth: boolean;
  isRegistered: boolean;
}

export interface AuthSchema {
  authData: AuthData;
  loadingAuth: FetchStatus;
  loadingRegistered: FetchStatus;
  errorAuth: Nullable<string> | undefined;
  errorRegistered: Nullable<string> | undefined;
}
