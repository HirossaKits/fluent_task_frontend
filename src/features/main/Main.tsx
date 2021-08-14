import React from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Task from "../task/Task";

const useStyles = makeStyles((theme) => ({
  main: {
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(3),
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Task />
    </div>
  );
};

export default Main;
