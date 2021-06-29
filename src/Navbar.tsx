import React from 'react';
import { AppBar, Toolbar, Drawer, Typography, IconButton, Badge, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Main from './features/main/Main';
// import { FiLogOut } from "react-icons/fi";

const drawerWidth = 10;

const useSytle = makeStyles((theme) => ({
  toolbar: {
    minHeight: '0px',
    paddingLeft: '0px'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `${100 - drawerWidth}vw`,
    marginLeft: `${drawerWidth}vw`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${drawerWidth}vw`,
  },
  contentShift: {
    // flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: `${drawerWidth}vw`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    background: theme.palette.divider,
  },
}));

const signOut = () => { };


const Navbar = () => {
  const classes = useSytle();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar className={open ? classes.appBarShift : classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={open ? classes.hide : classes.menuButton}
            onClick={handleDrawerOpen}>
            <AppsIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Fluent Task
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton>
              <Badge
                badgeContent={1}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge >
            </IconButton>
            <IconButton
              edge="end"
              // aria-controls={menuId}
              aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar >
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"DEMO"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItem>
          {Array(1).map(() => (
            <ListItem button>
              < ListItemIcon >
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={"DEMO"} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={open ? classes.content : classes.contentShift}>
        <Main />
      </main>
    </>
  );
};

export default Navbar;
