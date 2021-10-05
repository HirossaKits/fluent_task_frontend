import React from "react";
import { css } from "@emotion/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { TARGET } from "../features/types";
import internal from "stream";
import { queryAllByAttribute } from "@testing-library/dom";

type Props = {
  options: {
    value: string | number;
    label: string | number;
  }[];
  label?: string;
  width?: number;
  name: string;
  value: string | number;
  index?: number;
  onChange: Function;
};

const CommonSelect: React.FC<Props> = (props) => {
  const handleSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newItem: string
  ) => {
    alert(newItem);
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

  const styles = {
    autoComp: css`
      ${"width" in props && `width: ${props.width}px`}
    `,
  };

  return (
    <>
      <Autocomplete
        css={styles.autoComp}
        disableClearable
        options={props.options}
        getOptionLabel={(option) => option.label.toString()}
        onChange={(event, newItem) => handleSelectChange(event, newItem)}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
      {/* <TextField
        variant="standard"
        css={selectStyle}
        select
        fullWidth
        margin="normal"
        size="small"
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
      </TextField> */}
    </>
  );
};

export default CommonSelect;
