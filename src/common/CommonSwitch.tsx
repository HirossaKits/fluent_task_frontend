import React from "react";
import Grid from "@material-ui/core/Grid";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { makeStyles, Typography } from "@material-ui/core";
import { TARGET } from "../types";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  switch: {
    color: theme.palette.primary.main,
    "&$checked": {
      color: theme.palette.primary.main,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

type WidthNumber = 2 | 4 | 6 | 8 | 10 | 12;

type Props = {
  label?: string;
  labelWidth?: WidthNumber;
  type?: string;
  name: string;
  value: boolean;
  onChange: Function;
};

const CommonSwitch: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target: TARGET = {
      name: props.name,
      value: !props.value,
    };
    props.onChange(target);
  };

  return (
    <Grid className={classes.wrapper} container alignItems='center' xs={12}>
      {"label" in props && (
        <Grid item xs={"labelWidth" in props ? props.labelWidth : 8}>
          <Typography variant='body2'>{props.label}</Typography>
        </Grid>
      )}
      <Grid
        item
        xs={
          "labelWidth" in props &&
          ((12 - (props.labelWidth ?? 0)) as WidthNumber)
        }
      >
        <Switch
          checked={props.value}
          className={classes.switch}
          color='primary'
          size='small'
          onChange={handleToggleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CommonSwitch;
