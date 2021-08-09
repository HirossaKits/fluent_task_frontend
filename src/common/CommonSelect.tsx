import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { TARGET } from "../types";

type Props = {
  options: {
    value: string | number;
    label: string | number;
  }[];
  label?: string;
  name: string;
  value: string | number;
  onChange: Function;
};

const useStyles = makeStyles(() => ({
  select: {
    textAlign: "left",
  },
}));

const CommonSelect: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target: TARGET = {
      name: props.name,
      value: event.target.value,
    };
    console.log(target);
    props.onChange(target);
  };

  const classes = useStyles();

  return (
    <TextField
      className={classes.select}
      select
      fullWidth
      margin='normal'
      size='small'
      label={"label" in props ? props.label : undefined}
      value={props.value}
      onChange={handleChange}
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
