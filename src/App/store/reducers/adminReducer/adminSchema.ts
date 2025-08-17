import { ResponseGenre } from "@/App/store/reducers/adminReducer/services/fetchGenres";
import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export type GenreKey =
  | "HORROR"
  | "ADVENTURE"
  | "FANTASY"
  | "ROMANCE"
  | "COMEDY"
  | "DRAMA"
  | "DETECTIVE"
  | "DYSTOPIA";

export const GenreName: Record<GenreKey, string> = {
  HORROR: "УЖАСЫ",
  ADVENTURE: "ПРИКЛЮЧЕНИЯ",
  FANTASY: "ФЭНТЕЗИ",
  ROMANCE: "РОМАН",
  COMEDY: "КОМЕДИЯ",
  DRAMA: "ДРАМА",
  DETECTIVE: "ДЭТЕКТИВ",
  DYSTOPIA: "АНТИУТОПИЯ",
};

export interface AdminSchema {
  data: null;
  genres: ResponseGenre[];
  loadingStatusGenre: FetchStatus;
  loadingCreateBook: FetchStatus;
  errorGenre: Nullable<string> | undefined;
  errorCreateBook: Nullable<string> | undefined;
}
