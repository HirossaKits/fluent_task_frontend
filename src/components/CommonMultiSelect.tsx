import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { TARGET } from "../features/types";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: Option[];
  label?: string;
  placeholder?: string;
  width?: number;
  name: string;
  index?: number;
  onChange: Function;
  readOnly?: boolean;
};

export default function CommonMultiSelect(props: Props) {
  const handleSelectedChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option[]
  ) => {
    let target: TARGET = {
      name: props.name,
      value: value.map((option) => option.value),
    };
    props.onChange(target);
  };

  const selectedValues = props.value.map((val) => val.value);

  return (
    <Autocomplete
      multiple
      options={props.options}
      value={props.value}
      disableCloseOnSelect
      onChange={handleSelectedChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props_ch, option, { selected }) => {
        console.log("test", props);
        console.log("test", option);
        const isChecked = selectedValues.includes(option.value);

        return (
          <li {...props_ch}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={isChecked}
            />
            {option.label}
          </li>
        );
      }}
      style={{ width: props.width ?? "100%" }}
      renderInput={(params) =>
        props.readOnly ? (
          <TextField
            {...params}
            label={props.label ?? ""}
            placeholder={props.placeholder ?? ""}
            variant="standard"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : (
          <TextField
            {...params}
            label={props.label ?? ""}
            placeholder={props.placeholder ?? ""}
            variant="standard"
            margin="normal"
          />
        )
      }
    />
  );
}
