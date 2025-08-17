import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { adminSliceReducer } from "@/App/store/reducers/adminReducer/adminSlice";
import { authSliceReducer } from "@/App/store/reducers/authReducer/authSlice";
import { itemBookSliceReducer } from "@/App/store/reducers/bookItemReducer/bookSlice";
import { booksSliceReducer } from "@/App/store/reducers/booksReducer/booksSlice";
import { profileSliceReducer } from "@/App/store/reducers/profileReducer/profileSlice";
import { reviewsSliceReducer } from "@/App/store/reducers/reviewsReducer/reviewsSlice";
import { userPreferenceSliceReducer } from "@/App/store/reducers/userPreference/userPreferenceSlice";

const persistConfig = {
  key: "userPreference",
  storage,
  whitelist: ["userPreference"],
};

export const rootReducer = combineReducers({
  books: booksSliceReducer,
  bookItem: itemBookSliceReducer,
  reviews: reviewsSliceReducer,
  authPreference: authSliceReducer,
  userPreference: userPreferenceSliceReducer,
  profile: profileSliceReducer,
  admin: adminSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};
export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
