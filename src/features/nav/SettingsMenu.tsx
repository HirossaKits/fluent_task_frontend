import React from "react";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import CommonSwitch from "../../common/CommonSwitch";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectSettingsMenuOpen } from "./navSlice";
import { setSettingsMenuOpen } from "./navSlice";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

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

const SettingsMenu: React.FC<Props> = (props) => {
  const classes = useStyles();
  const settingsMenuOpen = useSelector(selectSettingsMenuOpen);
  const dispatch = useDispatch();

  const handleProfileColse = () => {
    dispatch(setSettingsMenuOpen(false));
  };

  console.log(props.anchorEl.current);

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
