import { createSlice } from "@reduxjs/toolkit";

import { ReviewsScheme } from "@/App/store/reducers/reviewsReducer/reviewsScheme";
import { createReview } from "@/App/store/reducers/reviewsReducer/services/createReview";
import { deleteUserReview } from "@/App/store/reducers/reviewsReducer/services/deleteUserReview";
import { fetchReviews } from "@/App/store/reducers/reviewsReducer/services/fetchReviews";
import { fetchUserReview } from "@/App/store/reducers/reviewsReducer/services/fetchUserReview";
import { updateUserReview } from "@/App/store/reducers/reviewsReducer/services/updateUserReview";
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
  userReview: {
    bookId: "",
    personId: "",
    reviewId: "",
    comment: "",
    createdDate: "",
  },
  loadingUserReview: FetchStatus.IDLE,
  errorUserReview: null,
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
    clearUserReview(state: ReviewsScheme) {
      state.userReview = initialState.userReview;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserReview.pending, state => {
        state.errorUserReview = null;
        state.loadingUserReview = FetchStatus.PENDING;
      })
      .addCase(fetchUserReview.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.loadingUserReview = FetchStatus.SUCCESS;
      })
      .addCase(fetchUserReview.rejected, (state, action) => {
        state.errorUserReview = action.payload?.message?.toUpperCase();
        state.loadingUserReview = FetchStatus.REJECTED;
      });
    builder
      .addCase(createReview.pending, state => {
        state.errorUserReview = null;
        state.loadingUserReview = FetchStatus.PENDING;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.loadingUserReview = FetchStatus.SUCCESS;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.errorUserReview = action.payload?.message?.toUpperCase();
        state.loadingUserReview = FetchStatus.REJECTED;
      });
    builder
      .addCase(updateUserReview.pending, state => {
        state.errorUserReview = null;
        state.loadingUserReview = FetchStatus.PENDING;
      })
      .addCase(updateUserReview.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.loadingUserReview = FetchStatus.SUCCESS;
      })
      .addCase(updateUserReview.rejected, (state, action) => {
        state.errorUserReview = action.payload?.message?.toUpperCase();
        state.loadingUserReview = FetchStatus.REJECTED;
      });
    builder
      .addCase(deleteUserReview.pending, state => {
        state.errorUserReview = null;
        state.loadingUserReview = FetchStatus.PENDING;
      })
      .addCase(deleteUserReview.fulfilled, state => {
        state.userReview = initialState.userReview;
        state.loadingUserReview = FetchStatus.SUCCESS;
      })
      .addCase(deleteUserReview.rejected, (state, action) => {
        state.errorUserReview = action.payload?.message?.toUpperCase();
        state.loadingUserReview = FetchStatus.REJECTED;
      });
    builder
      .addCase(fetchReviews.pending, state => {
        state.loadingReviews = FetchStatus.PENDING;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        // console.log(action.payload);
        // state.reviews = {...state.reviews, content:reviewMock.content};
        state.loadingReviews = FetchStatus.SUCCESS;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.errorReviews = action.payload?.message?.toUpperCase() as string;
        state.loadingReviews = FetchStatus.REJECTED;
        // console.log(action.payload);
        // state.reviews = {...state.reviews, content:reviewMock.content};
        // state.loadingReviews = FetchStatus.SUCCESS;
      });
  },
});

export const { setPagination, clearUserReview } = reviewsSlice.actions;
export const reviewsSliceReducer = reviewsSlice.reducer;
