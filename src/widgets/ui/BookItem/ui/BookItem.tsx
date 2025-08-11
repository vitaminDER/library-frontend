import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Button } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import { UserRole } from "@/App/store/reducers/authReducer/authSchema";
import { getItemBookSelector } from "@/App/store/reducers/bookItemReducer/selectors";
import { deleteItemBook } from "@/App/store/reducers/bookItemReducer/services/deleteItemBook";
import { fetchItemBook } from "@/App/store/reducers/bookItemReducer/services/fetchItemBook";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { PATH } from "@/constants";
import { Accordion } from "@/widgets/ui/Accordion";
import { BookImage } from "@/widgets/ui/BookImage";
import { ErrorComponent } from "@/widgets/ui/ErrorComponent";
import { Rating } from "@/widgets/ui/Rating";

import {
  ButtonBlock,
  ButtonContainer,
  InfoBook,
  InfoBookContainer,
  InfoBookWrapper,
  LinkBox,
} from "./styles";

export const BookItem = () => {
  const { isAuth, role } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { book, errorBooks } = useAppSelector(getItemBookSelector);
  const bookId = id && id.slice(1);
  const year = book?.year ? `${book.year} г.` : "";

  const genreList = book?.genre.map((el, index) => {
    const isLast = index === book?.genre.length - 1 ? "." : ", ";
    return (
      <span key={el.id}>
        {el.name.toUpperCase()}
        {isLast}
      </span>
    );
  });
  const deleteHandler = (id: string | undefined) => {
    if (id) {
      dispatch(deleteItemBook(id));
      navigate(PATH.BASE);
    }
  };

  useEffect(() => {
    dispatch(fetchItemBook({ id: bookId }));
  }, []);

  if (errorBooks) {
    return <ErrorComponent title={errorBooks} />;
  }

  return (
    <InfoBookWrapper>
      <Link to={PATH.BASE}>
        <LinkBox>
          <NavigateBeforeIcon fontSize="small" /> Главная
        </LinkBox>
      </Link>
      <InfoBookContainer style={{ color: "#000" }}>
        {book?.image ? (
          <img src={book.image} width={200} height={300} alt={"imag"} />
        ) : (
          <BookImage bookName={book?.title} author={book?.author} />
        )}

        <InfoBook>
          <Rating rating={book ? book.rating : 0} />
          <h3> {book?.title.toUpperCase()}</h3>
          <div>Автор: {book?.author}</div>

          <div>Год издания: {year}</div>
          <div>Описание: {book?.description}</div>
          <div> Жанр: {genreList}</div>
          <div>Рейтинг: {book?.rating}</div>
        </InfoBook>
      </InfoBookContainer>
      <ButtonBlock>
        {isAuth && role === UserRole.ADMIN ? (
          <ButtonContainer>
            <Button variant="outlined" onClick={() => deleteHandler(bookId)}>
              Удалить
            </Button>
          </ButtonContainer>
        ) : (
          (null as ReactNode)
        )}
        <ButtonContainer>
          <Button variant="outlined" style={{ width: "100%" }}>
            Читать
          </Button>
        </ButtonContainer>
      </ButtonBlock>
      <Accordion />
    </InfoBookWrapper>
  );
};
