import { Divider } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  getBooksSelector,
  getErrorBooksSelector,
} from "@/App/store/reducers/booksReducer/selectors";
import { fetchBooks } from "@/App/store/reducers/booksReducer/services";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { BooksListContainer, BooksWrapper } from "@/pages/Books/ui/styles";
import { BookImage } from "@/widgets/ui/BookImage";
import { ErrorComponent } from "@/widgets/ui/ErrorComponent";

export const Books = () => {
  const dispatch = useAppDispatch();
  const allBooks = useAppSelector(getBooksSelector);
  const error = useAppSelector(getErrorBooksSelector);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [allBooks.length]);

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
  }, [allBooks]);

  if (error) {
    return <ErrorComponent title={error} image={"bug"} />;
  }

  return (
    <BooksWrapper>
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
    </BooksWrapper>
  );
};
