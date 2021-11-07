import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import CommonSwitch from "../../common/CommonSwitch";
import { makeStyles } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectSettingsMenuOpen, selectSettings } from "./mainSlice";
import { setSettingsMenuOpen, setSettings } from "./mainSlice";
import { TARGET } from "../types";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const SettingsMenu: React.FC<Props> = (props) => {
  const theme = useTheme();
  const settingsMenuOpen = useSelector(selectSettingsMenuOpen);
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const handleInputChange = (target: TARGET) => {
    dispatch(setSettings({ ...settings, [target.name]: target.value }));
  };

  const handleColse = () => {
    dispatch(setSettingsMenuOpen(false));
  };

  const styles = {
    paper: css`
    width: 180px,
    padding-left: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
    padding-right: ${theme.spacing(4)};
    padding-bottom: ${theme.spacing(2)};
    background-color: green;
  `,
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
      <Paper css={styles.paper}>
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
