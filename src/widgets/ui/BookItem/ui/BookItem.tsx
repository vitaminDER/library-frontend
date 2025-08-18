import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Button } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/App/store/hooks/useAuth";
import { GenreName } from "@/App/store/reducers/adminReducer/adminSchema";
import { UserRole } from "@/App/store/reducers/authReducer/authSchema";
import { getItemBookSelector } from "@/App/store/reducers/bookItemReducer/selectors";
import { deleteItemBook } from "@/App/store/reducers/bookItemReducer/services/deleteItemBook";
import { fetchItemBook } from "@/App/store/reducers/bookItemReducer/services/fetchItemBook";
import { fetchBooks } from "@/App/store/reducers/booksReducer/services";
import { getReviews } from "@/App/store/reducers/reviewsReducer/selectors";
import { fetchReviews } from "@/App/store/reducers/reviewsReducer/services/fetchReviews";
import {
  fetchUserReview,
  RequestUserReview,
} from "@/App/store/reducers/reviewsReducer/services/fetchUserReview";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FetchStatus } from "@/App/store/storeTypes";
import { PATH } from "@/constants";
import { BookImage } from "@/widgets/ui/BookImage";
import { ErrorComponent } from "@/widgets/ui/ErrorComponent";
import { Rating } from "@/widgets/ui/Rating";
import { ReviewAllUsers } from "@/widgets/ui/ReviewAllUsers";
import { UserReview } from "@/widgets/ui/UserReview";

import {
  ButtonBlock,
  ButtonContainer,
  InfoBook,
  InfoBookContainer,
  InfoBookWrapper,
  LinkBox,
  ReviewContainer,
} from "./styles";

export const BookItem = () => {
  const userAuthData = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { reviews } = useAppSelector(getReviews);
  const { book, errorBooks, loadingBooks } =
    useAppSelector(getItemBookSelector);
  const bookId: string = id ? id.slice(1) : "";
  const year = book.year && `${book.year} г.`;

  const genreList = useMemo(() => {
    return book?.genre.map((el, index) => {
      const isLast = index === book?.genre.length - 1 ? "." : ", ";
      return (
        <span key={el.id}>
          {GenreName[el.name]}
          {isLast}
        </span>
      );
    });
  }, [book?.genre]);

  const deleteHandler = () => {
    if (bookId) {
      dispatch(deleteItemBook(bookId));
      dispatch(fetchBooks());
      navigate(PATH.BASE);
    }
  };

  useEffect(() => {
    dispatch(fetchItemBook({ id: bookId }));
    const requestReviews = {
      bookId: bookId,
      pageNumber: reviews.pageNumber,
      pageSize: reviews.pageSize,
    };
    dispatch(fetchReviews(requestReviews));

    if (userAuthData.id) {
      const requestUserReview: RequestUserReview = {
        bookId: bookId,
        personId: userAuthData.id,
      };
      dispatch(fetchUserReview(requestUserReview));
    }
  }, [bookId, dispatch, reviews.pageNumber, reviews.pageSize, userAuthData.id]);

  if (errorBooks) {
    return <ErrorComponent title={errorBooks} />;
  }

  if (loadingBooks === FetchStatus.PENDING) {
    return <div>loading</div>;
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
          <BookImage bookName={book.title} author={book.author} />
        )}

        <InfoBook>
          <Rating rating={book ? book.rating : 0} />
          <h3> {book.title.toUpperCase()}</h3>
          <div>Автор: {book.author}</div>

          <div>Год издания: {year}</div>
          <div>Описание: {book.description}</div>
          <div> Жанр: {genreList}</div>
          <div>Рейтинг: {book.rating}</div>
        </InfoBook>
      </InfoBookContainer>
      <ButtonBlock>
        {userAuthData.isAuth && userAuthData.role === UserRole.ADMIN ? (
          <ButtonContainer>
            <Button variant="outlined" onClick={deleteHandler}>
              Удалить
            </Button>
          </ButtonContainer>
        ) : null}
        <ButtonContainer>
          <Button variant="outlined" style={{ width: "100%" }}>
            Читать
          </Button>
        </ButtonContainer>
      </ButtonBlock>
      <ReviewContainer>
        {userAuthData.isAuth && <UserReview />}
        <ReviewAllUsers />
      </ReviewContainer>
    </InfoBookWrapper>
  );
};
