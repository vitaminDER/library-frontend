export type Nullable<T> = T | null;

export enum FetchStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  REJECTED = "rejected",
}

export interface RequestError {
  code: Nullable<string | number>;
  errorCode: Nullable<string | number>;
  message: Nullable<string>;
}
