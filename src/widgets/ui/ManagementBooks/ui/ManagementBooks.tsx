import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { ChangeEvent, useMemo, useState } from "react";

import { GenreName } from "@/App/store/reducers/adminReducer/adminSchema";
import { getGenreSelector } from "@/App/store/reducers/adminReducer/adminSelectors";
import { useAppSelector } from "@/App/store/storeHooks";
import { MultiSelect, MultiSelectOption } from "@/shared/MultiSelect";
import {
  BookElement,
  BookListContainer,
  FilterPanelContainer,
  ManagementBooksWrapper,
} from "@/widgets/ui/ManagementBooks/ui/styled";
import { FormStates } from "@/widgets/ui/RegistrationForm/ui/interface";

interface OptionsRadioGroup {
  id: string;
  value: string;
  label: string;
}

const radioOptions: OptionsRadioGroup[] = [
  { id: "Названию", value: "Названию", label: "Названию" },
  { id: "Автору", value: "Автору", label: "Автору" },
  { id: "ISBN", value: "ISBN", label: "ISBN" },
];

const mockBooks = [
  { id: 1, name: "odin", author: "Tor" },
  { id: 2, name: "odin", author: "Tor" },
  { id: 3, name: "odin", author: "Tor" },
  { id: 4, name: "odin", author: "Tor" },
];

export const ManagementBooks = () => {
  const genres = useAppSelector(getGenreSelector);
  const [searchValue, setSearchValue] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [valueRadio, setValueRadio] = React.useState("Названию");
  const [selectedGenreId, setSelectedGenreId] = useState<string[]>([]);

  const optionsGenge: MultiSelectOption[] = useMemo(() => {
    return genres.map(genre => {
      return { id: genre.id, value: GenreName[genre.name] };
    });
  }, [genres]);

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  const handleBookName = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value: string = e.target.value;
    setSearchValue({ ...searchValue, value: value, error: "" });
  };

  const optionsRadio = radioOptions.map(option => {
    return (
      <FormControlLabel
        key={option.id}
        value={option.value}
        control={<Radio size="small" />}
        label={option.label}
      />
    );
  });

  const bookList = mockBooks.map((book, index) => {
    return (
      <BookElement key={book.id} isLast={index !== mockBooks.length - 1}>
        <div>{book.name}</div>
        <div>{book.author}</div>

        <Tooltip arrow color={"#fff"} title="Редактировать" placement="top">
          <IconButton aria-label="edit" color="primary">
            <ModeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip arrow color={"#fff"} title="Удалить книгу" placement="top">
          <IconButton aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </BookElement>
    );
  });
  return (
    <ManagementBooksWrapper>
      <FilterPanelContainer>
        <MultiSelect
          options={optionsGenge}
          label={"Жанры"}
          selectedIds={selectedGenreId}
          setSelectedIds={setSelectedGenreId}
          size={"small"}
        />
        <TextField
          size={"small"}
          value={searchValue.value}
          helperText={searchValue.error}
          error={!!searchValue.error}
          id="searchValue"
          label={`Поиск по ${valueRadio}`}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleBookName(e)
          }
        />
        <FormControl>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={valueRadio}
            onChange={handleChangeRadio}
          >
            {optionsRadio}
          </RadioGroup>
        </FormControl>
      </FilterPanelContainer>
      <BookListContainer>{bookList}</BookListContainer>
    </ManagementBooksWrapper>
  );
};
