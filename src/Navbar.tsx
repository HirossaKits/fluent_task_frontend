import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from '@material-ui/icons/AccountCircle';
// import { FiLogOut } from "react-icons/fi";

const useSytle = makeStyles((theme) => ({
  toolbar: {
    minHeight: '42px',
    paddingLeft: '0px'
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Oleo Script',
    textAlign: "left",
    display: 'block',
    marginLeft: theme.spacing(3)
  },
  sectionDesktop: {
    display: 'flex',
  },
}));

const signOut = () => { };

const Navbar = () => {
  const classes = useSytle();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <Typography className={classes.title} variant="h5" noWrap>
          Fluent Task
        </Typography>
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show new notifications">
            <Badge
              badgeContent={1}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge >
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
          // onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;
