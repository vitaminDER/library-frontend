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

export interface BooksData {
  id: string;
  title: string;
  author: string;
  image: string;
}

export interface ResponseBooksData {
  content: BooksData[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface AdminSchema {
  booksData: ResponseBooksData;
  genres: ResponseGenre[];
  loadingStatusGenre: FetchStatus;
  loadingCreateBook: FetchStatus;
  loadingBooksData: FetchStatus;
  errorGenre: Nullable<string> | undefined;
  errorCreateBook: Nullable<string> | undefined;
  errorBooksData: Nullable<string> | undefined;
}
