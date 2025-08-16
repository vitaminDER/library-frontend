import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

import { FormStates } from "@/pages/Registration/ui/interface";
import {
  ButtonBox,
  CreateBookWrapper,
  FormWrapper,
} from "@/widgets/ui/CreateBook/ui/styles";

const VisuallyHiddenInput = styled("input")({
  // clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CreateBook = () => {
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

  return (
    <CreateBookWrapper>
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
        <TextField
          multiline
          value={bookDescription.value}
          helperText={bookDescription.error}
          error={!!bookDescription.error}
          id="bookDescription"
          label="Описание"
          maxRows={4}
          sx={{ width: "835px" }}
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
        <Button variant="outlined">Добавить книгу</Button>
      </ButtonBox>
    </CreateBookWrapper>
  );
};
