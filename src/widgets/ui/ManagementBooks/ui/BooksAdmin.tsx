import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { ChangeEvent } from "react";

import {
  getBookDataSelector,
  getErrorBookDataSelector,
  getStatusBookDataSelector,
} from "@/App/store/reducers/adminReducer/adminSelectors";
import { setBooksPagination } from "@/App/store/reducers/adminReducer/adminSlice";
import { deleteItemBook } from "@/App/store/reducers/bookItemReducer/services/deleteItemBook";
import { fetchBooks } from "@/App/store/reducers/booksReducer/services";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import { ErrorComponent } from "@/shared/ErrorComponent";
import {
  BookListContainer,
  PaginationContainer,
  RowTableBookList,
  TableCell,
} from "@/widgets/ui/ManagementBooks/ui/styled";

const mockBooks = [
  {
    id: "1",
    title: "odin",
    author: "Tor",
    ISBN: "345",
    image:
      "https://i.pinimg.com/736x/17/08/4a/17084a85a3075f0e49810435fe3f24fd.jpg",
  },
  {
    id: "2",
    title: "odin",
    author: "Tor",
    ISBN: "345",
    image:
      "https://i.pinimg.com/736x/17/08/4a/17084a85a3075f0e49810435fe3f24fd.jpg",
  },
  {
    id: "3",
    title: "odin",
    author: "Tor",
    ISBN: "345",
    image:
      "https://i.pinimg.com/736x/17/08/4a/17084a85a3075f0e49810435fe3f24fd.jpg",
  },
  {
    id: "4",
    title: "odin",
    author: "Tor",
    ISBN: "345",
    image:
      "https://i.pinimg.com/736x/17/08/4a/17084a85a3075f0e49810435fe3f24fd.jpg",
  },
];

export const BooksAdmin = () => {
  const dispatch = useAppDispatch();
  const { content, pageNumber, totalPages } =
    useAppSelector(getBookDataSelector);
  const errorBooksData = useAppSelector(getErrorBookDataSelector);
  const statusBooksData = useAppSelector(getStatusBookDataSelector);

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setBooksPagination(value));
  };

  const deleteHandler = (id: string) => {
    dispatch(deleteItemBook(id));
    dispatch(fetchBooks());
  };

  const bookListMook = mockBooks.map(book => {
    return (
      <RowTableBookList key={book.id} isLast>
        <TableCell>
          <img src={book.image} alt={book.title} width="30px" height="40px" />
          {book.title}
        </TableCell>
        <TableCell>{book.author}</TableCell>
        <TableCell>{book.ISBN}</TableCell>

        <TableCell>
          <Tooltip arrow color={"#fff"} title="Редактировать" placement="top">
            <IconButton aria-label="edit" color="primary">
              <ModeIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip arrow color={"#fff"} title="Удалить книгу" placement="top">
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => {
                deleteHandler(book.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </RowTableBookList>
    );
  });

  if (errorBooksData) {
    return <ErrorComponent title={errorBooksData} image={"bug"} />;
  }

  return (
    <>
      {statusBooksData === FetchStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <BookListContainer>
          <RowTableBookList>
            <TableCell>Название</TableCell>
            <TableCell>Автор</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </RowTableBookList>
          {bookListMook}
          <PaginationContainer>
            <Pagination
              count={totalPages}
              page={pageNumber}
              size="small"
              onChange={handlePaginationChange}
            />
          </PaginationContainer>
        </BookListContainer>
      )}
    </>
  );
};
