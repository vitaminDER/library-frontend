import { createSlice } from "@reduxjs/toolkit";

import { BooksScheme } from "@/App/store/reducers/booksReducer/booksScheme";
import { fetchBooks } from "@/App/store/reducers/booksReducer/services";
import { FetchStatus } from "@/App/store/storeTypes";

// const mockBooks: IBooks[] = [
//     {
//         id: '1',
//         title: 'Воина и мир',
//         author: 'Толстой Л.Н.',
//         image: '',
//     }, {
//         id: '2',
//         title: 'Хоббит',
//         author: 'Толкин Р.Р.',
//         image: '',
//     },
// ]

const initialState: BooksScheme = {
  books: [],
  loadingBooks: FetchStatus.IDLE,
  errorBooks: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loadingBooks = FetchStatus.PENDING;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.books = action.payload;
        state.loadingBooks = FetchStatus.SUCCESS;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.errorBooks = action.payload?.message as string;
        state.loadingBooks = FetchStatus.REJECTED;
        // console.log(action.payload)
        // state.books = mockBooks;
        // state.loadingBooks = FetchStatus.SUCCESS;
      });
  },
});

export const booksSliceActions = booksSlice.actions;
export const booksSliceReducer = booksSlice.reducer;
