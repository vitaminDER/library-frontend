export interface MultiSelectOption {
  id: string;
  value: string;
}

export interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
}
