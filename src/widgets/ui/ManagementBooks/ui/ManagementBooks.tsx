import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import { getBookDataSelector } from "@/App/store/reducers/adminReducer/adminSelectors";
import {
  fetchAdminBooks,
  RequestAdminBooks,
} from "@/App/store/reducers/adminReducer/services/fetchAdminBooks";
import { useAppDispatch, useAppSelector } from "@/App/store/storeHooks";
import { BooksAdmin } from "@/widgets/ui/ManagementBooks/ui/BooksAdmin";
import {
  FilterPanelContainer,
  ManagementBooksWrapper,
} from "@/widgets/ui/ManagementBooks/ui/styled";
import { FormStates } from "@/widgets/ui/RegistrationForm/ui/interface";

interface OptionsRadioGroup {
  id: string;
  value: string;
  label: string;
}

const searchName: Record<string, string> = {
  ["НАЗВАНИЮ"]: "TITLE",
  ["АВТОРУ"]: "AUTHOR",
  ["ISBN"]: "ISBN",
};

const radioOptions: OptionsRadioGroup[] = [
  { id: "НАЗВАНИЮ", value: "Названию", label: "Названию" },
  { id: "АВТОРУ", value: "Автору", label: "Автору" },
  { id: "ISBN", value: "ISBN", label: "ISBN" },
];

export const ManagementBooks = () => {
  const dispatch = useAppDispatch();
  const { pageNumber, pageSize } = useAppSelector(getBookDataSelector);
  const [searchValue, setSearchValue] = useState<FormStates>({
    value: "",
    error: "",
  });
  const [valueRadio, setValueRadio] = React.useState("Названию");

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

  const getBooksHandler = useCallback(() => {
    const request: RequestAdminBooks = {
      searchValue: searchValue.value,
      typeSearch: searchName[valueRadio.toUpperCase()],
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    dispatch(fetchAdminBooks(request));
  }, [dispatch, pageNumber, pageSize, searchValue.value, valueRadio]);

  useEffect(() => {
    getBooksHandler();
  }, [getBooksHandler]);

  return (
    <ManagementBooksWrapper>
      <FilterPanelContainer>
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
      <BooksAdmin getBooksHandler={getBooksHandler} />
    </ManagementBooksWrapper>
  );
};
