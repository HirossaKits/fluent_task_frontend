import React from "react";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import CommonSwitch from "../../common/CommonSwitch";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectSettingsMenuOpen, selectSettings } from "./navSlice";
import { setSettingsMenuOpen, setSettings } from "./navSlice";
import { TARGET } from "../types";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 180,
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));

const SettingsMenu: React.FC<Props> = (props) => {
  const classes = useStyles();
  const settingsMenuOpen = useSelector(selectSettingsMenuOpen);
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const handleInputChange = (target: TARGET) => {
    dispatch(setSettings({ ...settings, [target.name]: target.value }));
  };

  const handleColse = () => {
    dispatch(setSettingsMenuOpen(false));
  };

  return (
    <Popover
      open={settingsMenuOpen}
      anchorEl={props.anchorEl.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={handleColse}
      keepMounted
    >
      <Paper className={classes.paper}>
        {/* <div className={classes.switchWrapper}> */}
        <CommonSwitch
          label={"ダークモード"}
          labelWidth={10}
          name='dark_mode'
          value={settings.dark_mode}
          onChange={handleInputChange}
        />
        {/* <CommonSwitch label={"test"} labelWidth={10} />
        <CommonSwitch label={"test"} labelWidth={10} /> */}
        {/* </div> */}
      </Paper>
    </Popover>
  );
};

export default SettingsMenu;
