import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

import { MenuProps } from "@/widgets/ui/CreateBook/ui/constants";
import { MultiSelectProps } from "@/widgets/ui/MultiSelect/ui/interface";

const SELECT_ALL = "select-all";

export const MultiSelect = (props: MultiSelectProps) => {
  const { label, options, selectedIds, setSelectedIds } = props;

  const handleChange = (event: SelectChangeEvent<typeof selectedIds>) => {
    const { value } = event.target;
    const newValue = typeof value === "string" ? value.split(",") : value;

    if (newValue.includes(SELECT_ALL)) {
      setSelectedIds(
        selectedIds.length === options.length
          ? []
          : options.map(item => item.id)
      );
      return;
    }

    setSelectedIds(newValue);
  };

  const getNameById = (id: string) => {
    const item = options.find(i => i.id === id);
    return item ? item.value : id;
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="multiple-select-label">{label}</InputLabel>
        <Select
          multiple
          labelId="multiple-select-label"
          id="multiple-select"
          value={selectedIds}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
          renderValue={selected => {
            if (selected.length > 1) {
              return <span>Выбрано {selected.length}</span>;
            } else {
              return (
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  {selected.map(id => {
                    return <span key={id}>{getNameById(id)}</span>;
                  })}
                </div>
              );
            }
          }}
          disabled={options.length === 0}
          onChange={handleChange}
        >
          <MenuItem value={SELECT_ALL}>
            <Checkbox
              checked={selectedIds.length === options.length}
              indeterminate={
                selectedIds.length > 0 && selectedIds.length < options.length
              }
            />
            <ListItemText primary="Выбрать все" />
          </MenuItem>

          {options.map(item => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selectedIds.includes(item.id)} />
              <ListItemText primary={item.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
