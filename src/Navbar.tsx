import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Popover,
  Fade,
  Grow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Main from "./features/main/Main";
import CommonSwitch from "./CommonSwitch";

const drawerWidth = 180;

const useSytle = makeStyles((theme) => ({
  toolbar: {
    minHeight: "0px",
    paddingLeft: "0px",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Oleo Script",
    textAlign: "left",
    display: "block",
    marginLeft: theme.spacing(3),
  },
  sectionDesktop: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerOpen: {
    width: drawerWidth,
    // flexShrink: 0,
    // whiteSpace: 'nowrap',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0,
    background: theme.palette.background.default,
  },
  drawerClose: {
    // flexShrink: 0,
    // whiteSpace: 'nowrap',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(6) + 1,
    border: 0,
    background: theme.palette.background.default,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    border: 0,
    background: theme.palette.divider,
  },
  content: {
    // flexGrow: 1,
    width: `calc(96%  - ${drawerWidth}px)`,
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  contentShift: {
    // flexGrow: 1,
    width: `calc(96%  - ${theme.spacing(6) + 1}px)`,
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(6) + 1,
  },
  drawerIcon: {
    paddingLeft: 12,
  },
  drawerText: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  profilePaper: {
    width: 140,
    padding: theme.spacing(1),
  },
  avatorLarge: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  avatorSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const signOut = () => {};

const Navbar = () => {
  const classes = useSytle();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [profileOpen, setProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const ref = createRef();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    anchorEl ?? setAnchorEl(event.currentTarget);
    // setProfileOpen(!profileOpen);
  };

  const handleProfileColse = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        className={drawerOpen ? classes.appBarShift : classes.appBar}
        position='static'
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={drawerOpen ? classes.hide : classes.menuButton}
            onClick={handleDrawerOpen}
          >
            <AppsIcon />
          </IconButton>
          <Typography className={classes.title} variant='h5' noWrap>
            Fluent Task
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton>
              <Badge badgeContent={1} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              // aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileOpen}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={drawerOpen ? classes.drawerOpen : classes.drawerClose}
        variant='permanent'
        anchor='left'
        open={drawerOpen}
        classes={{
          paper: drawerOpen ? classes.drawerOpen : classes.drawerClose,
        }}
      >
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
      <div className={drawerOpen ? classes.content : classes.contentShift}>
        <Main />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleProfileColse}
        keepMounted
      >
        <Paper className={classes.profilePaper}>
          <Badge
            overlap='circular'
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <div style={{ marginLeft: 0, marginTop: 0 }}>
                <Avatar className={classes.avatorSmall}>
                  <AddAPhotoIcon fontSize='small' />
                </Avatar>
              </div>
            }
          >
            <Avatar className={classes.avatorLarge} />
          </Badge>
          <br />
          <CommonSwitch label={"ダークモード"} labelWidth={10} />
          <CommonSwitch label={"test"} labelWidth={10} />
          <CommonSwitch label={"test"} labelWidth={10} />
        </Paper>
      </Popover>
    </>
  );
};

export default Navbar;
