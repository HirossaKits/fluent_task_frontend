import React from "react";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import CommonSwitch from "../../common/CommonSwitch";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectSettingsOpen, selectSettingsAnchorEl } from "./navSlice";
import { setSettingsOpen, setSettingsAnchorEl } from "./navSlice";

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

const SettingsMenu: React.FC = () => {
  const classes = useStyles();
  const settingsOpen = useSelector(selectSettingsOpen);
  const settingsAnchorEl = useSelector(selectSettingsAnchorEl);
  const dispatch = useDispatch();

  const handleProfileColse = () => {
    dispatch(setSettingsOpen(false));
    dispatch(setSettingsAnchorEl(null));
  };

  return (
    <Popover
      open={settingsOpen}
      anchorEl={settingsAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={handleProfileColse}
      keepMounted
    >
      <Paper className={classes.paper}>
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
