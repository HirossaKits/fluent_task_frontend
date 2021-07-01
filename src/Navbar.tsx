import React from 'react';
import { AppBar, Toolbar, Drawer, Typography, IconButton, Badge, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Main from './features/main/Main';

const drawerWidth = 180;

const useSytle = makeStyles((theme) => ({
  toolbar: {
    minHeight: '0px',
    paddingLeft: '0px',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerOpen: {
    width: drawerWidth,
    // flexShrink: 0,
    // whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0,
    background: theme.palette.grey[700],
  },
  drawerClose: {
    // flexShrink: 0,
    // whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    border: 0,
    background: theme.palette.grey[700],
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    border: 0,
    background: theme.palette.divider,
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  contentShift: {
    // flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(6) + 1,
  },
  drawerIcon: {
    paddingLeft: 12
  },
  drawerText: {
    color: 'rgba(255, 255, 255, 0.9)',
  }
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
        className={open ? classes.drawerOpen : classes.drawerClose}
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          paper: open ? classes.drawerOpen : classes.drawerClose,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button className={classes.drawerIcon}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText className={classes.drawerText} primary={"DEMO"} />
          </ListItem>
          <ListItem button className={classes.drawerIcon}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText className={classes.drawerText} primary={"Calendar"} />
          </ListItem>
          {Array(1).map(() => (
            <ListItem button>
              <ListItemIcon>
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
