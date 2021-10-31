import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import AppsIcon from "@mui/icons-material/Apps";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import {
  setSettingsMenuOpen,
  setProfileMenuOpen,
  setMainComponent,
  selectMainComponent,
  fetchAsyncGetLoginUserProfile,
} from "./navSlice";
import SettingsMenu from "./SettingsMenu";
import ProfileMenu from "./ProfileMenu";
import Org from "../org/Org";
import Proj from "../proj/Proj";
import Task from "../task/Task";
import Kanban from "../kanban/KanbanBoard";
import Calendar from "../calendar/Calendar";
import { MAIN_COMPONENT } from "../types";

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
  const drawerWidth = 180;
  const drawerCloseWidth = 54;
  const styles = {
    toolbar: css`
      padding: 0 9px;
    `,
    menuIcon: css`
      margin-left: 0px;
    `,
    menuIconHide: css`
      display: none;
    `,
    title: css`
      flex-grow: 1;
      font-family: "Oleo Script", cursive;
      text-align: left;
      display: block;
      margin-left: ${theme.spacing(4)};
    `,
    iconBox: css`
      margin-right: ${theme.spacing(2)};
    `,
    appBar: css`
      z-index: ${theme.zIndex.drawer + 1};
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
    `,
    appBarShift: css`
      width: calc(100% - ${drawerWidth}px);
      margin-left: ${drawerWidth};
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })};
    `,
    drawerOpen: css`
      & .MuiDrawer-paper {
        width: ${drawerWidth}px;
        transition: ${theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        })};
        background-color: ${theme.palette.background.paper};
        overflow-x: hidden;
      }
      flex-shrink: 0;
      white-space: nowrap;
    `,
    drawerClose: css`
      & .MuiDrawer-paper {
        width: ${drawerCloseWidth}px;
        transition: ${theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })};
        background-color: ${theme.palette.background.paper};
        overflow-x: hidden;
      }
      flexshrink: 0;
      white-space: nowrap;
    `,
    drawerHeader: css`
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: ${theme.spacing(0, 1)};
      background-color: ${theme.palette.divider};
      border-right-color: ${theme.palette.primary.main};
    `,
    drawerIcon: css`
      padding-left: 16px;
    `,
    drawerText: css`
      color: ${theme.palette.text.secondary};
      padding-bottom: 4;
    `,
    content: css`
      width: calc(100% - ${drawerWidth}px);
      padding-top: ${theme.spacing(8)};
      padding-left: ${theme.spacing(6)};
      padding-right: ${theme.spacing(6)};
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
      margin-left: ${drawerWidth}px;
    `,
    contentShift: css`
      width: calc(100% - ${drawerCloseWidth}px);
      padding-top: ${theme.spacing(8)};
      padding-left: ${theme.spacing(6)};
      padding-right: ${theme.spacing(6)};
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })};
      margin-left: ${drawerCloseWidth}px;
    `,
  };

  console.log(styles);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar
        css={drawerOpen ? styles.appBarShift : styles.appBar}
        position='fixed'
      >
        <Toolbar css={styles.toolbar} disableGutters variant='dense'>
          <IconButton
            css={drawerOpen ? styles.menuIconHide : styles.menuIcon}
            edge='start'
            onClick={handleDrawerOpen}
          >
            <AppsIcon />
          </IconButton>
          <Typography css={styles.title} variant='h5' noWrap>
            Fluent Task
          </Typography>
          <Box css={styles.iconBox} sx={{ display: "flex" }}>
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
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        css={drawerOpen ? styles.drawerOpen : styles.drawerClose}
        className={"1gxenss-drawerOpen"}
        variant='permanent'
        anchor='left'
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
            onClick={() => handleVirticalMenuClick("Org")}
          >
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText css={styles.drawerText} primary={"組織"} />
          </ListItem>
          <ListItem
            button
            css={styles.drawerIcon}
            onClick={() => handleVirticalMenuClick("Proj")}
          >
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText css={styles.drawerText} primary={"プロジェクト"} />
          </ListItem>
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
            onClick={() => handleVirticalMenuClick("Kanban")}
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
        {mainComponent === "Org" ? (
          <Org />
        ) : mainComponent === "Proj" ? (
          <Proj />
        ) : mainComponent === "List" ? (
          <Task />
        ) : mainComponent === "Kanban" ? (
          <Kanban />
        ) : mainComponent === "Calendar" ? (
          <Calendar />
        ) : (
          <div></div>
        )}
      </div>
      <SettingsMenu anchorEl={settingsAnchorEl} />
      <ProfileMenu anchorEl={profileAnchorEl} />
    </Box>
  );
};

export default Nav;
