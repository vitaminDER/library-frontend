import { ResponseGenre } from "@/App/store/reducers/adminReducer/services/fetchGenres";
import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export interface Genre {
  id: string;
  name: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  year: "";
  rating: number;
  description: string;
  genre: ResponseGenre[];
  image: string;
}

export interface BookItemScheme {
  book: BookItem;
  loadingBooks: FetchStatus;
  errorBooks: Nullable<string> | undefined;
}
