import { RootState } from "@/App/store/store";

export const getAuth = (state: RootState) => state.authPreference.authData;
