import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { selectProfileMenuOpen, selectProfile } from "./navSlice";
import { setProfileMenuOpen } from "./navSlice";
import styles from "./Nav.module.css";

type Props = {
  anchorEl: React.MutableRefObject<null>;
};

const useStyles = makeStyles((theme) => ({
  avatorWrapper: {
    padding: theme.spacing(1),
  },
  avatorLarge: {
    background: theme.palette.grey[600],
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  nameWrapper: {
    margin: 3,
    marginLeft: 3,
    marginRight: theme.spacing(2),
  },
  menuItem: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  iconWrapper: {
    paddingTop: 6,
    paddingRight: 12,
  },
}));

const ProfileMenu: React.FC<Props> = (props) => {
  const classes = useStyles();
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
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid className={classes.avatorWrapper} item xs={6}>
            <Avatar className={classes.avatorLarge} src={profile.avatar_img} />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            xs={6}
          >
            <Grid className={classes.nameWrapper} item>
              <Typography>Kitsuka</Typography>
            </Grid>
            <Grid className={classes.nameWrapper} item>
              <Typography>Hirohisaaaa</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Paper className="talk">
          <Typography>sample</Typography>
        </Paper>
        <MenuList>
          <MenuItem className={classes.menuItem}>
            <div className={classes.iconWrapper}>
              <EditIcon fontSize="small" />
            </div>
            <Typography variant="inherit">プロフィール編集</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={logout}>
            <div className={classes.iconWrapper}>
              <ExitToAppIcon fontSize="small" />
            </div>
            <Typography variant="inherit">ログアウト</Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </Popover>
  );
};

export default ProfileMenu;
