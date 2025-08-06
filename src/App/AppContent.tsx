import { LinearProgress } from "@mui/material";
import { JSX } from "react";
import { Outlet } from "react-router-dom";

import { getItemBookStatusSelector } from "@/App/store/reducers/bookItemReducer/selectors";
import { getLoadingBooksSelector } from "@/App/store/reducers/booksReducer/selectors";
import { useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import { AppContentWrapper, LoaderContainer } from "@/App/styled";
import { Nav } from "@/widgets/ui/Nav";

export const AppContent = (): JSX.Element => {
  const loadingStatusBooks = useAppSelector(getLoadingBooksSelector);
  const loadingStatusItemBook = useAppSelector(getItemBookStatusSelector);

  const isLoading =
    loadingStatusBooks === FetchStatus.PENDING ||
    loadingStatusItemBook === FetchStatus.PENDING;

  return (
    <AppContentWrapper>
      <Nav />
      <LoaderContainer>{isLoading ? <LinearProgress /> : null}</LoaderContainer>
      <Outlet />
    </AppContentWrapper>
  );
};
