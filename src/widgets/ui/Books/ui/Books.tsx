import { CircularProgress, Divider } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  getBooksSelector,
  getErrorBooksSelector,
  getLoadingBooksSelector,
} from "@/App/store/reducers/booksReducer/selectors";
import { fetchBooks } from "@/App/store/reducers/booksReducer/services";
import { clearUserReview } from "@/App/store/reducers/reviewsReducer/reviewsSlice";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import { BookImage } from "@/widgets/ui/BookImage";
import { BooksListContainer, BooksWrapper } from "@/widgets/ui/Books/ui/styles";
import { ErrorComponent } from "@/widgets/ui/ErrorComponent";

export const Books = () => {
  const dispatch = useAppDispatch();
  const allBooks = useAppSelector(getBooksSelector);
  const error = useAppSelector(getErrorBooksSelector);
  const loadingBooks = useAppSelector(getLoadingBooksSelector);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(clearUserReview());
  }, [dispatch]);

  const booksList = useMemo(() => {
    return allBooks.map(el => {
      return (
        <Link
          key={el.id}
          to={`/book/:${el.id}`}
          style={{
            color: "black",
            textDecoration: "none",
          }}
        >
          {el.image ? (
            <img src={el.image} width={200} height={300} alt={"imag"} />
          ) : (
            <BookImage bookName={el.title} author={el.author} />
          )}
        </Link>
      );
    });
  }, [allBooks.length]);

  if (error) {
    return <ErrorComponent title={error} image={"bug"} />;
  }

  return (
    <BooksWrapper>
      {loadingBooks === FetchStatus.PENDING ? (
        <CircularProgress size="30px" />
      ) : (
        <>
          <BooksListContainer>
            <h3>Рекомендованные</h3>
          </BooksListContainer>
          <Divider textAlign={"left"}>Все книги</Divider>
          <BooksListContainer>
            {booksList.length === 0 ? (
              <ErrorComponent title={"Список книг пуст"} />
            ) : (
              booksList
            )}
          </BooksListContainer>
        </>
      )}
    </BooksWrapper>
  );
};
