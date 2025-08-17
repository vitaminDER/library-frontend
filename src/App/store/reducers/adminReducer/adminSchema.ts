import { ResponseGenre } from "@/App/store/reducers/adminReducer/services/fetchGenres";
import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export interface AdminSchema {
  data: null;
  genres: ResponseGenre[];
  loadingStatusGenre: FetchStatus;
  errorGenre: Nullable<string> | undefined;
}
