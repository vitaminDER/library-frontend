import {createSlice, SliceCaseReducers} from "@reduxjs/toolkit";

import {BookItemScheme, Genre} from "@/App/store/reducers/bookItemReducer/bookItemSheme";
import {deleteItemBook} from "@/App/store/reducers/bookItemReducer/services/deleteItemBook";
import {fetchItemBook} from "@/App/store/reducers/bookItemReducer/services/fetchItemBook";
import {FetchStatus} from "@/App/store/storeTypes";

const initialState: BookItemScheme = {
    book: {
        id: '',
        title: '',
        author: '',
        year: 0,
        rating: 0,
        description: '',
        genre: [],
        image: '',
    },
    loadingBooks: FetchStatus.IDLE,
    errorBooks: null,
};

const bookItemSlice = createSlice<
    BookItemScheme,
    SliceCaseReducers<BookItemScheme>
>({
    name: "bookItem",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchItemBook.pending, state => {
                state.errorBooks = null;
                state.loadingBooks = FetchStatus.PENDING;
            })
            .addCase(fetchItemBook.fulfilled, (state, action) => {
                state.book = action.payload;
                state.loadingBooks = FetchStatus.SUCCESS;
            })
            .addCase(fetchItemBook.rejected, (state, action) => {
                state.errorBooks = action.payload?.message as string;
                state.loadingBooks = FetchStatus.REJECTED;
            });
        builder
            .addCase(deleteItemBook.pending, state => {
                state.errorBooks = null;
                state.loadingBooks = FetchStatus.PENDING;
            })
            .addCase(deleteItemBook.fulfilled, state => {
                state.book = initialState.book;
                state.loadingBooks = FetchStatus.SUCCESS;
            })
            .addCase(deleteItemBook.rejected, (state, action) => {
                state.errorBooks = action.payload?.message;
                state.loadingBooks = FetchStatus.REJECTED;
            });
    },
});

export const itemBookSliceActions = bookItemSlice.actions;
export const itemBookSliceReducer = bookItemSlice.reducer;
