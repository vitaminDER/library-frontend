import { FetchStatus, Nullable } from "@/App/store/storeTypes";

export interface IBooks {
  id: string;
  title: string;
  author: string;
  image: string;
}

export interface BooksScheme {
  books: IBooks[];
  loadingBooks: FetchStatus;
  errorBooks: Nullable<string>;
}
