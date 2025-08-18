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
import { SELECT_ALL } from "@/widgets/ui/MultiSelect/ui/constants";
import { MultiSelectProps } from "@/widgets/ui/MultiSelect/ui/interface";

export const MultiSelect = (props: MultiSelectProps) => {
  const { label, options, selectedIds, setSelectedIds } = props;

  const optionsMultiSelect = options.map(item => (
    <MenuItem key={item.id} value={item.id}>
      <Checkbox checked={selectedIds.includes(item.id)} size="small" />
      <ListItemText primary={item.value} />
    </MenuItem>
  ));

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

  const renderValueHelper = (selected: string[]) => {
    if (selected.length > 1) {
      return <span>Выбрано {selected.length}</span>;
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          {selected.map(id => {
            return <span key={id}>{getNameById(id)}</span>;
          })}
        </div>
      );
    }
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
          renderValue={selected => renderValueHelper(selected)}
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

          {optionsMultiSelect}
        </Select>
      </FormControl>
    </div>
  );
};
