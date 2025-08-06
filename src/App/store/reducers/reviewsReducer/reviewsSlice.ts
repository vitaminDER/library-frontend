import { createSlice } from "@reduxjs/toolkit";

import { ReviewsScheme } from "@/App/store/reducers/reviewsReducer/reviewsScheme";
import { fetchReviews } from "@/App/store/reducers/reviewsReducer/services/fetchReviews";
import { FetchStatus } from "@/App/store/storeTypes";

// const reviewMock = {
//     content: [
//         {
//             personId: '1',
//             username: 'Иванов Иван',
//             comment: 'В extraReducers можно обрабатывать действия из нескольких builder-ов, но сам extraReducers принимает только один колбэк с builder. Однако внутри этого колбэка вы можете обрабатывать действия из разных слайсов или редьюсеров.',
//             createdDate: '21.11.2025',
//             evaluation: 4,
//         },
//         {
//             personId: '2',
//             username:
//                 'Петров Петр',
//             comment:
//                 'В extraReducers можно обрабатывать действия из нескольких builder-ов, но сам extraReducers принимает только один колбэк с builder. Однако внутри этого колбэка вы можете обрабатывать действия из разных слайсов или редьюсеров.',
//             createdDate:
//                 '02.11.2025',
//             evaluation:
//                 3,
//         }
//         ,
//         {
//             personId: '3',
//             username:
//                 'Петров Петр',
//             comment:
//                 'В extraReducers можно обрабатывать действия из нескольких builder-ов, но сам extraReducers принимает только один колбэк с builder. Однако внутри этого колбэка вы можете обрабатывать действия из разных слайсов или редьюсеров.',
//             createdDate:
//                 '02.11.2025',
//             evaluation:
//                 3,
//         }
//         ,
//     ],
//     pageNumber: 1,
//     pageSize: 10,
//     totalPage: 5,
// }

const initialState: ReviewsScheme = {
  reviews: {
    content: [],
    pageNumber: 1,
    pageSize: 5,
    totalPages: 5,
  },
  loadingReviews: FetchStatus.IDLE,
  errorReviews: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setPagination(state: ReviewsScheme, action) {
      state.reviews.pageNumber = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, state => {
        state.loadingReviews = FetchStatus.PENDING;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        // console.log(action.payload);
        // state.reviews = reviewMock;
        state.loadingReviews = FetchStatus.SUCCESS;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.errorReviews = action.payload?.message?.toUpperCase() as string;
        state.loadingReviews = FetchStatus.REJECTED;
        // console.log(action.payload);
        // state.reviews = reviewMock;
        // state.loadingReviews = FetchStatus.SUCCESS;
      });
  },
});

export const { setPagination } = reviewsSlice.actions;
export const reviewsSliceReducer = reviewsSlice.reducer;
