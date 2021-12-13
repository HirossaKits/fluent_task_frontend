import React from "react";
import { css } from "@emotion/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TARGET } from "../features/types";

type Option = {
  value: string | number;
  label: string | number;
};

type Props = {
  options: Option[];
  label?: string;
  width?: number;
  name: string;
  value: string | number;
  index?: number;
  onChange: Function;
};

const CommonSelect: React.FC<Props> = (props: Props) => {
  const handleSelectChange = (event: any, newItem: Option) => {
    let target: TARGET = {
      name: props.name,
      value: newItem.value,
    };
    if ("index" in props) {
      target.index = props.index;
    }
    props.onChange(target);
  };

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
        value={props.options.find((opt) => opt.value === props.value)}
        onChange={(event, newItem) => handleSelectChange(event, newItem)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='standard'
            margin='normal'
            label={"label" in props && props.label}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </>
  );
};

export default CommonSelect;
