import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
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

const Nav = () => {
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

  const theme = useTheme();
  const styles = {
    toolbar: css`
      minheight: 0;
      paddingleft: 0;
    `,
    menuButtonDisp: css`
      marginright: 36;
    `,
    menuButtonHide: css`
      display: none;
    `,
    title: css`
      flexgrow: 1;
      fontfamily: Oleo Script;
      textalign: left;
      display: block;
      marginleft: ${theme.spacing(3)};
    `,
    iconSection: css`
      display: flex;
    `,
    appBar: css`
      zindex: ${theme.zIndex.drawer + 1};
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
    `,
    appBarShift: css`
      width: calc(100% - ${drawerWidth}px);
      marginleft: drawerWidth;
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })};
    `,
    drawerOpen: css`
      width: drawerWidth;
      flexShrink: 0;
      whiteSpace: nowrap;
      transition: ${theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })},
      border: 0;
      background: ${theme.palette.background.paper},
    `,
    drawerClose: css`
      flexShrink: 0;
      whiteSpace: nowrap;
      transition: ${theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })},
      overflowX: hidden;
      width: ${theme.spacing(6) + 1};
      border: 0;
      background: ${theme.palette.background.paper};
    `,
    drawerHeader: css`
      display: flex;
      alignItems: center;
      padding: ${theme.spacing(0, 1)}
      justifyContent: flex-end;
      border: 0;
      background: ${theme.palette.divider};
    `,
    drawerIcon: css`
      paddingleft: 12;
    `,
    drawerText: css`
      color: ${theme.palette.text.secondary};
      paddingbottom: 4;
    `,
    content: css`
      width: calc(96%  - ${drawerWidth}px);
      paddingTop: ${theme.spacing(3)},
      transition: ${theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })},
      marginLeft: drawerWidth;
    `,
    contentShift: css`
      width: calc(96%  - ${theme.spacing(6) + 1}px);
      paddingTop: ${theme.spacing(3)};
      transition: ${theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })},
      marginLeft: ${theme.spacing(6) + 1};
    `,
  };

  return (
    <>
      <AppBar
        css={drawerOpen ? styles.appBarShift : styles.appBar}
        position="static"
      >
        <Toolbar css={styles.toolbar}>
          <IconButton
            css={drawerOpen ? styles.menuButtonHide : styles.menuButtonDisp}
            onClick={handleDrawerOpen}
          >
            <AppsIcon />
          </IconButton>
          <Typography css={styles.title} variant="h5" noWrap>
            Fluent Task
          </Typography>
          <div css={styles.iconSection}>
            <IconButton>
              <Badge badgeContent={1} color="secondary">
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
        css={drawerOpen ? styles.drawerOpen : styles.drawerClose}
        variant="permanent"
        anchor="left"
        open={drawerOpen}
      >
        <div css={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem
            button
            css={styles.drawerIcon}
            onClick={() => handleVirticalMenuClick("List")}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText css={styles.drawerText} primary={"一覧"} />
          </ListItem>
          <ListItem
            button
            css={styles.drawerIcon}
            onClick={() => handleVirticalMenuClick("Card")}
          >
            <ListItemIcon>
              <ViewWeekIcon />
            </ListItemIcon>
            <ListItemText css={styles.drawerText} primary={"カード"} />
          </ListItem>
          <ListItem
            button
            css={styles.drawerIcon}
            onClick={() => handleVirticalMenuClick("Calendar")}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText css={styles.drawerText} primary={"カレンダー"} />
          </ListItem>
        </List>
      </Drawer>
      <div css={drawerOpen ? styles.content : styles.contentShift}>
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
