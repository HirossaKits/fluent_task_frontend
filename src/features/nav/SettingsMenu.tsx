import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import CommonSwitch from "../../common/CommonSwitch";
import { makeStyles } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectSettingsMenuOpen, selectSettings } from "./navSlice";
import { setSettingsMenuOpen, setSettings } from "./navSlice";
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
    width: 180,
    paddingLeft: ${theme.spacing(2)};
    paddingTop: ${theme.spacing(2)};
    paddingRight: ${theme.spacing(4)};
    paddingBottom: ${theme.spacing(2)};
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
