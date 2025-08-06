import { RootState } from "@/App/store/store";

export const getItemBookSelector = (state: RootState) => state.bookItem;
export const getItemBookStatusSelector = (state: RootState) =>
  state.bookItem.loadingBooks;
