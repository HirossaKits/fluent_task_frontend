import React from 'react';
import { AppBar, Toolbar, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import { FiLogOut } from "react-icons/fi";

const useSytle = makeStyles((theme) => ({
  bg: {
    marginRight: theme.spacing(1),
  },
  title: {
    fontFamily: 'Oleo Script',
    flexGrow: 1,
  },
}));

const signOut = () => { };

const Navbar = () => {
  const classes = useSytle();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Fluent Task
        </Typography>
        <Badge
          className={classes.bg}
          badgeContent={1}
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
        <button className="signOut" onClick={signOut}>
          {/* <FiLogOut /> */}
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
