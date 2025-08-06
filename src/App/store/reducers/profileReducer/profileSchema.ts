import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export interface Profile {
  id: string;
  login: string;
}

export interface ProfileSchema {
  profile: Profile;
  loadingProfile: FetchStatus;
  errorProfile: Nullable<string> | undefined;
}
