import React from "react";
import Grid from "@material-ui/core/Grid";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
};

const CommonSwitch: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid container alignItems='center' xs={12}>
      {"label" in props && (
        <Grid item xs={"labelWidth" in props ? props.labelWidth : 6}>
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
        <Switch className={classes.switch} color='primary' size='small' />
      </Grid>
    </Grid>
  );
};

export default CommonSwitch;
