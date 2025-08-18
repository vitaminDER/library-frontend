import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { GenreName } from "@/App/store/reducers/adminReducer/adminSchema";
import { getGenreSelector } from "@/App/store/reducers/adminReducer/adminSelectors";
import {
  createNewBook,
  RequestCreateNewBook,
} from "@/App/store/reducers/adminReducer/services/createNewBook";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { FormStates } from "@/pages/Registration/ui/interface";
import {
  isImageUrl,
  VisuallyHiddenInput,
} from "@/widgets/ui/CreateBook/ui/constants";
import {
  ButtonBox,
  CreateBookWrapper,
  FormWrapper,
} from "@/widgets/ui/CreateBook/ui/styles";
import { MultiSelect } from "@/widgets/ui/MultiSelect";
import { MultiSelectOption } from "@/widgets/ui/MultiSelect/ui/interface";

export const CreateBook = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(getGenreSelector);

  const [bookName, setBookName] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [bookAuthor, setBookAuthor] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [yearPublication, setYearPublication] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [bookDescription, setBookDescription] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [imageUrl, setImageUrl] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [selectedGenreId, setSelectedGenreId] = useState<string[]>([]);

  const optionsGenge: MultiSelectOption[] = useMemo(() => {
    return genres.map(genre => {
      return { id: genre.id, value: GenreName[genre.name] };
    });
  }, [genres]);

  const handleBookName = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueBookName: string = e.target.value;
    setBookName({ ...bookName, value: valueBookName, error: "" });
  };

  const handleBookAuthor = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueBookAuthor: string = e.target.value;
    setBookAuthor({ ...bookName, value: valueBookAuthor, error: "" });
  };

  const handleBookYearPublication = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueYearPublication: string = e.target.value;
    const regex = /^(0|[1-9]\d{0,2}|1\d{3}|20[0-1]\d|202[0-5])$/;
    if (valueYearPublication === "" || regex.test(valueYearPublication)) {
      setYearPublication({
        ...yearPublication,
        value: valueYearPublication,
        error: "",
      });
    }
  };

  const handleImageUrl = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueImageUrl: string = e.target.value;

    setImageUrl({
      ...imageUrl,
      value: valueImageUrl,
      error: "",
    });
  };

  const handleBookDescription = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueBookDescription: string = e.target.value;
    setBookDescription({
      ...bookDescription,
      value: valueBookDescription,
      error: "",
    });
  };

  const createBookHandler = useCallback(() => {
    const isValidName = bookName.value.trim() === "";
    const isValidUrl = imageUrl.value && isImageUrl(imageUrl.value);

    if (isValidName) {
      setBookName({ ...bookName, error: "Поле должно быть заполнено" });
    }
    if (imageUrl.value && !isImageUrl(imageUrl.value)) {
      setImageUrl({ ...imageUrl, error: "Не валидный адрес" });
    }

    const isValidForm = !isValidName && isValidUrl;
    if (isValidForm) {
      const requestNewBook: RequestCreateNewBook = {
        title: bookName.value,
        author: bookAuthor.value,
        year: yearPublication.value,
        genreId: selectedGenreId,
        image: imageUrl.value,
        description: bookDescription.value,
      };
      dispatch(createNewBook(requestNewBook));
    }
  }, [
    bookAuthor.value,
    bookDescription.value,
    bookName,
    dispatch,
    imageUrl,
    selectedGenreId,
    yearPublication.value,
  ]);

  return (
    <CreateBookWrapper>
      <FormWrapper>
        <TextField
          value={bookName.value}
          helperText={bookName.error}
          error={!!bookName.error}
          id="bookName"
          label="Название книги"
          sx={{ width: "400px" }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleBookName(e)
          }
        />
        <TextField
          value={bookAuthor.value}
          helperText={bookAuthor.error}
          error={!!bookAuthor.error}
          id="bookAuthor"
          label="Автор книги"
          sx={{ width: "400px" }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleBookAuthor(e)
          }
        />
        <TextField
          value={yearPublication.value}
          helperText={yearPublication.error}
          error={!!yearPublication.error}
          id="yearPublication"
          label="Год издания"
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleBookYearPublication(e)
          }
        />
      </FormWrapper>
      <FormWrapper>
        <MultiSelect
          options={optionsGenge}
          label={"Жанры"}
          selectedIds={selectedGenreId}
          setSelectedIds={setSelectedGenreId}
        />

        <TextField
          value={imageUrl.value}
          helperText={imageUrl.error}
          error={!!imageUrl.error}
          id="imageUrl"
          label="Ссылка на картинку обложки книги"
          maxRows={4}
          sx={{ width: "716px" }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleImageUrl(e)
          }
        />
      </FormWrapper>
      <FormWrapper>
        <TextField
          multiline
          value={bookDescription.value}
          helperText={bookDescription.error}
          error={!!bookDescription.error}
          id="bookDescription"
          label="Описание"
          maxRows={4}
          sx={{ width: "716px" }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleBookDescription(e)
          }
        />

        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Загрузить книгу
          <VisuallyHiddenInput
            multiple
            type="file"
            onChange={event => console.log(event.target.files)}
          />
        </Button>
      </FormWrapper>

      <ButtonBox>
        <Button variant="outlined" onClick={createBookHandler}>
          Добавить книгу
        </Button>
      </ButtonBox>
    </CreateBookWrapper>
  );
};
