import { RootState } from "@/App/store/store";

export const getGenreSelector = (state: RootState) => state.admin.genres;
