import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { selectProfileMenuOpen, selectProfile } from "./mainSlice";
import { setProfileMenuOpen } from "./mainSlice";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const ProfileMenu: React.FC<Props> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const profileMenuOpen = useSelector(selectProfileMenuOpen);
  const profile = useSelector(selectProfile);

  console.log(profile.avatar_img);

  const logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  const handleProfileColse = () => {
    dispatch(setProfileMenuOpen(false));
  };

  const styles = {
    avatorWrapper: css`
      padding: ${theme.spacing(1)};
    `,
    avatorLarge: css`
      background-color: ${theme.palette.grey[600]};
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
    `,
    nameWrapper: css`
      margin: 3px,
      margin-left: 3px,
      margin-right: ${theme.spacing(2)};
    `,
    menuItem: css`
      padding-left: ${theme.spacing(2)};
      padding-right: ${theme.spacing(2)};
    `,
    iconWrapper: css`
      padding-top: 6px,
      padding-right: 12px,
    `,
  };

  return (
    <Popover
      open={profileMenuOpen}
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
      <Paper>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
        >
          <Grid css={styles.avatorWrapper} item xs={6}>
            <Avatar css={styles.avatorLarge} src={profile.avatar_img} />
          </Grid>
          <Grid
            item
            container
            direction='column'
            justifyContent='center'
            alignItems='stretch'
            xs={6}
          >
            <Grid css={styles.nameWrapper} item>
              <Typography>Kitsuka</Typography>
            </Grid>
            <Grid css={styles.nameWrapper} item>
              <Typography>Hirohisaaaa</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Paper css='talk'>
          <Typography>sample</Typography>
        </Paper>
        <MenuList>
          <MenuItem css={styles.menuItem}>
            <div css={styles.iconWrapper}>
              <EditIcon fontSize='small' />
            </div>
            <Typography>プロフィール編集</Typography>
          </MenuItem>
          <MenuItem css={styles.menuItem} onClick={logout}>
            <div css={styles.iconWrapper}>
              <ExitToAppIcon fontSize='small' />
            </div>
            <Typography>ログアウト</Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </Popover>
  );
};

export default ProfileMenu;
