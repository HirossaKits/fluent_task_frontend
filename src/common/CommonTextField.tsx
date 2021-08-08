import React from "react";
import TextField from "@material-ui/core/TextField";
import { TARGET } from "../types";

type Props = {
  id?: string;
  label?: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: Function;
};

const CommonTextField: React.FC<Props> = (props) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let target: TARGET = {
      name: event.target.name,
      value: event.target.value,
    };
    props.onChange(target);
  };

  return (
    <TextField
      variant='standard'
      fullWidth
      margin='normal'
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
