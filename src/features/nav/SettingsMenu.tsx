import React from "react";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import CommonSwitch from "../CommonSwitch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 140,
    padding: theme.spacing(1),
  },
  switchWrapper: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
}));

const SettingsMenu = () => {
  const classes = useStyles();
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      // onClose={handleProfileColse}
      keepMounted
    >
      <Paper className={classes.paper}>
        <input
          type='file'
          id='imageInput'
          hidden={true}
          // onChange={(event) => {
          //   setCover(event.target.files[0]);
          //   event.target.value = "";
          // }}
        />
        <div className={classes.switchWrapper}>
          <CommonSwitch label={"ダークモード"} labelWidth={10} />
          <CommonSwitch label={"test"} labelWidth={10} />
          <CommonSwitch label={"test"} labelWidth={10} />
        </div>
      </Paper>
    </Popover>
  );
};

export default SettingsMenu;
