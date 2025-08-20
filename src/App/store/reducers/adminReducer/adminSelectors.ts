import { RootState } from "@/App/store/store";

export const getGenreSelector = (state: RootState) => state.admin.genres;

export const getBookDataSelector = (state: RootState) => state.admin.booksData;
export const getStatusBookDataSelector = (state: RootState) =>
  state.admin.loadingBooksData;
export const getErrorBookDataSelector = (state: RootState) =>
  state.admin.errorBooksData;
