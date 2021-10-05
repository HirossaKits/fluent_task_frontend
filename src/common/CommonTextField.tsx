import React from "react";
import TextField from "@mui/material/TextField";
import { TARGET } from "../features/types";

type Props = {
  id?: string;
  label?: string;
  type?: string;
  name: string;
  value: null | string | number;
  index?: number;
  onChange: Function;
};

const CommonTextField: React.FC<Props> = (props) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let target: TARGET = {
      name: props.name,
      value: event.target.value,
    };
    if ("index" in props) {
      target.index = props.index;
    }
    props.onChange(target);
  };

  return (
    <TextField
      variant='standard'
      margin='normal'
      fullWidth
      size='small'
      id={"id" in props ? props.id : undefined}
      label={"label" in props ? props.label : undefined}
      type={"type" in props ? props.type : undefined}
      name={props.name}
      value={props.value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => handleInputChange(event)}
    />
  );
};

export default CommonTextField;
