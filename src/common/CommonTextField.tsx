import React from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  id?: string;
  label?: string;
  type?: string;
  handleOnChange: Function;
};

const CommonTextField: React.FC<Props> = (props) => {
  return (
    <TextField
      variant='standard'
      fullWidth
      margin='dense'
      size='small'
      id={"id" in props ? props.id : undefined}
      label={"label" in props ? props.label : undefined}
      type={"type" in props ? props.type : undefined}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => props.handleOnChange(event.target.value)}
    />
  );
};

export default CommonTextField;
