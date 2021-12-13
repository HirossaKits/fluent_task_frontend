import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Switch, { SwitchClassKey, SwitchProps } from "@mui/material/Switch";
import { makeStyles, Typography } from "@mui/material";
import { TARGET } from "../features/types";

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
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target: TARGET = {
      name: props.name,
      value: !props.value,
    };
    props.onChange(target);
  };

  const theme = useTheme();
  const styles = {
    wrapper: css`
      marginTop: ${theme.spacing(1)},
      marginBottom: ${theme.spacing(1)},
    `,
    switch: css`
      color: ${theme.palette.primary.main};
      &$checked: {
        color: ${theme.palette.primary.main}
      },
      &$checked + $track: {
        backgroundColor: ${theme.palette.primary.main}
      ,
    `,
  };

  return (
    <Grid css={styles.wrapper} container alignItems='center' xs={12}>
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
          css={styles.switch}
          color='primary'
          size='small'
          onChange={handleToggleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CommonSwitch;
