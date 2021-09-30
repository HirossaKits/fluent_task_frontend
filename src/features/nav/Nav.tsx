import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css, Theme } from "@emotion/react";
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
import MoreIcon from "@mui/icons-material/MoreVert";

const Nav = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mainComponent = useSelector(selectMainComponent);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    console.log("Opened");
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    console.log("Closed");
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
  const drawerWidth = 1800;
  const styles = {
    toolbar: css`
      min-height: 0;
      padding-left: 0;
    `,
    menuButtonDisp: css`
      margin-right: 36;
    `,
    menuButtonHide: css`
      display: none;
    `,
    title: css`
      flexgrow: 1;
      font-family: "Oleo Script", cursive;
      text-align: left;
      display: block;
      margin-left: ${theme.spacing(3)};
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
      margin-left: ${drawerWidth};
      transition: ${theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })};
    `,
    // drawerOpen: css`
    // background-color: green;
    //   width: ${drawerWidth}px;
    //   flexShrink: 0;
    //   white-space: nowrap;
    //   transition: ${theme.transitions.create("width", {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.enteringScreen,
    //   })},
    //   border: 0;
    //   background-color: ${theme.palette.background.paper};
    // `,
    drawerOpen: css`
      background-color: green;
      width: ${drawerWidth}px;
      flexshrink: 0;
      white-space: nowrap;
      border: 0;
      color: green;
    `,
    // drawerClose: css`
    //   flexShrink: 0;
    //   whiteSpace: nowrap;
    //   transition: ${theme.transitions.create("width", {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    //   })},
    //   overflowX: hidden;
    //   width: ${theme.spacing(6) + 1};
    //   border: 0;
    //   background-color: ${theme.palette.background.paper};
    // `,
    drawerClose: css`
      width: 0px;
      flexshrink: 0;
      whitespace: nowrap;
      overflowx: hidden;
      border: 0;
      color: green;
    `,
    drawerHeader: css`
      display: flex;
      align-items: center;
      padding: ${theme.spacing(0, 1)}
      justifyContent: flex-end;
      border: 0;
      background-color: ${theme.palette.divider};
    `,
    drawerIcon: css`
      padding-left: 12;
    `,
    drawerText: css`
      color: ${theme.palette.text.secondary};
      padding-bottom: 4;
    `,
    content: css`
      width: calc(96%  - ${drawerWidth}px);
      padding-top: ${theme.spacing(3)},
      transition: ${theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })},
      margin-left: drawerWidth;
    `,
    contentShift: css`
      width: calc(96%  - ${theme.spacing(6) + 1}px);
      padding-top: ${theme.spacing(3)};
      transition: ${theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })},
      margin-left: ${theme.spacing(6) + 1};
    `,
  };

  console.log(styles);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        css={drawerOpen ? styles.appBarShift : styles.appBar}
        position='fixed'
      >
        <Toolbar
          // css={styles.toolbar}
          variant='dense'
        >
          <IconButton
            // className={
            //   drawerOpen
            //     ? styles.menuButtonHide.styles
            //     : styles.menuButtonDisp.styles
            // }
            onClick={handleDrawerOpen}
          >
            <AppsIcon />
          </IconButton>
          <Typography css={styles.title} variant='h5' noWrap>
            Fluent Task
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
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
    </Box>
  );
};

export default Nav;
