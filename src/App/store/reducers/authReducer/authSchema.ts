import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}

export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface AuthData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  login: string;
  role: Role;
  token: string;
  isAuth: boolean;
}

export interface AuthSchema {
  authData: AuthData;
  isRegistered: boolean;
  loadingAuth: FetchStatus;
  loadingAuthMe: FetchStatus;
  loadingRegistered: FetchStatus;
  errorAuth: Nullable<string> | undefined;
  errorRegistered: Nullable<string> | undefined;
  errorAuthMe: Nullable<string> | undefined;
}
