import React from "react";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { TARGET } from "../features/types";

type Props = {
  options: {
    value: string | number;
    label: string | number;
  }[];
  label?: string;
  name: string;
  value: string | number;
  index?: number;
  onChange: Function;
};

const CommonSelect: React.FC<Props> = (props) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target: TARGET = {
      name: props.name,
      value: event.target.value,
    };
    if ("index" in props) {
      target.index = props.index;
    }
    props.onChange(target);
  };

  const selectStyle = css`
    textalign: left;
  `;

  return (
    <TextField
      variant='standard'
      css={selectStyle}
      select
      fullWidth
      margin='normal'
      size='small'
      label={"label" in props ? props.label : undefined}
      value={props.value}
      onChange={handleSelectChange}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {props.options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CommonSelect;
