import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/material/styles";
import AppsIcon from "@mui/icons-material/Apps";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  setSettingsMenuOpen,
  setProfileMenuOpen,
  setMainComponent,
  selectMainComponent,
  fetchAsyncGetLoginUserProfile,
} from "./navSlice";
import SettingsMenu from "./SettingsMenu";
import ProfileMenu from "./ProfileMenu";
import Task from "../task/Task";
import Calendar from "../calendar/Calendar";
import { MAIN_COMPONENT } from "../types";

const drawerWidth = 180;

const useSytle = makeStyles((theme) => ({
  toolbar: {
    minHeight: 0,
    paddingLeft: 0,
  },
  menuButtonDisp: {
    marginRight: 36,
  },
  menuButtonHide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Oleo Script",
    textAlign: "left",
    display: "block",
    marginLeft: theme.spacing(3),
  },
  iconSection: {
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
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0,
    background: theme.palette.background.paper,
  },
  drawerClose: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(6) + 1,
    border: 0,
    background: theme.palette.background.paper,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    border: 0,
    background: theme.palette.divider,
  },
  drawerIcon: {
    paddingLeft: 12,
  },
  drawerText: {
    color: theme.palette.text.secondary,
    paddingBottom: 4,
  },
  content: {
    width: `calc(96%  - ${drawerWidth}px)`,
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  contentShift: {
    width: `calc(96%  - ${theme.spacing(6) + 1}px)`,
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(6) + 1,
  },
}));

const Nav = () => {
  const classes = useSytle();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mainComponent = useSelector(selectMainComponent);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const settingsAnchorEl = useRef(null);
  const profileAnchorEl = useRef(null);

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setSettingsMenuOpen(true));
  };

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setProfileMenuOpen(true));
  };

  const handleVirticalMenuClick = (component: MAIN_COMPONENT) => {
    dispatch(setMainComponent(component));
  };

  useEffect(() => {
    dispatch(fetchAsyncGetLoginUserProfile());
  }, [dispatch]);

  return (
    <>
      <AppBar
        className={drawerOpen ? classes.appBarShift : classes.appBar}
        position='static'
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={
              drawerOpen ? classes.menuButtonHide : classes.menuButtonDisp
            }
            onClick={handleDrawerOpen}
          >
            <AppsIcon />
          </IconButton>
          <Typography className={classes.title} variant='h5' noWrap>
            Fluent Task
          </Typography>
          <div className={classes.iconSection}>
            <IconButton>
              <Badge badgeContent={1} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton ref={settingsAnchorEl} onClick={handleSettingsOpen}>
              <SettingsIcon />
            </IconButton>
            <IconButton ref={profileAnchorEl} onClick={handleProfileOpen}>
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
          <ListItem
            button
            className={classes.drawerIcon}
            onClick={() => handleVirticalMenuClick("List")}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText className={classes.drawerText} primary={"一覧"} />
          </ListItem>
          <ListItem
            button
            className={classes.drawerIcon}
            onClick={() => handleVirticalMenuClick("Card")}
          >
            <ListItemIcon>
              <ViewWeekIcon />
            </ListItemIcon>
            <ListItemText className={classes.drawerText} primary={"カード"} />
          </ListItem>
          <ListItem
            button
            className={classes.drawerIcon}
            onClick={() => handleVirticalMenuClick("Calendar")}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.drawerText}
              primary={"カレンダー"}
            />
          </ListItem>
        </List>
      </Drawer>
      <div className={drawerOpen ? classes.content : classes.contentShift}>
        {mainComponent === "List" ? (
          <Task />
        ) : mainComponent === "Calendar" ? (
          <Calendar />
        ) : (
          <div></div>
        )}
      </div>
      <SettingsMenu anchorEl={settingsAnchorEl} />
      <ProfileMenu anchorEl={profileAnchorEl} />
    </>
  );
};

export default Nav;
