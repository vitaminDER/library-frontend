import { Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import { FormStates } from "@/pages/Registration/ui/interface";
import {
  CreateBookWrapper,
  FormWrapper,
} from "@/widgets/ui/CreateBook/ui/styles";

export const CreateBook = () => {
  const [bookName, setBookName] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [bookAuthor, setBookAuthor] = useState<FormStates>({
    value: "",
    error: "",
  });

  const handleBookName = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueLogin: string = e.target.value;
    setBookName({ ...bookName, value: valueLogin, error: "" });
  };
  const handleBookAuthor = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const valueLogin: string = e.target.value;
    setBookAuthor({ ...bookName, value: valueLogin, error: "" });
  };
  return (
    <CreateBookWrapper>
      <div>
        <Typography variant="h6">Добавление книги</Typography>
      </div>
      <FormWrapper>
        <TextField
          value={bookName.value}
          helperText={bookName.error}
          error={!!bookName.error}
          id="bookName"
          label="Название книги"
          sx={{ width: "300px" }}
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
          sx={{ width: "300px" }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleBookAuthor(e)
          }
        />
      </FormWrapper>
      <Button variant="outlined">Добавить книгу</Button>
    </CreateBookWrapper>
  );
};
