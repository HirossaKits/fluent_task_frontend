import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { dummyUsers } from "../../DummyData";
import { USER_PROFILE } from "../types";

const Org = () => {
  const theme = useTheme();

  const [focus, setFocus] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOnFocus = () => {
    setFocus(true);
  };
  const handleOnBlur = () => {
    setFocus(false);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const styles = {
    invite: css`
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
    `,
    textfield: css`
      width: 17ch;
      margin: ${theme.spacing(1)};
    `,
    iconbutton: css`
      color: inherit;
    `,
    iconbuttonFocus: css`
      color: ${theme.palette.primary.main};
    `,
    wrap: css`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: start;
      height: 90vh;
      margin-top: ${theme.spacing(1)};
    `,
    card: css`
      display: flex;
      flex-direction: column;
      width: 210px;
      height: 130px;
      margin: 9px 20px;
      position: relative;
    `,
    dot: css`
      position: absolute;
      top: 0px;
      right: 5px;
      z-index: 800;
      color: ${theme.palette.divider};
    `,
    popver: css`
      box-shadow: none;
    `,
    avatar: css`
      width: 80px;
      height: 80px;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 36px;
    `,
    name: css`
      margin-top: 10px;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      background-color: lgray;
    `,
    comment: css`
      margin-top: 9px;
      margin-left: 18px;
      margin-right: 18px;
    `,
  };
  return (
    <>
      <Box css={styles.invite}>
        <TextField
          css={styles.textfield}
          variant='standard'
          label='ユーザーを招待'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton
                  css={focus ? styles.iconbuttonFocus : styles.iconbutton}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </Box>
      <Box css={styles.wrap}>
        {dummyUsers.map((user: USER_PROFILE) => (
          <Card css={styles.card}>
            <IconButton css={styles.dot} onClick={handleClick}>
              <MoreHorizIcon fontSize='small' />
            </IconButton>
            <Box sx={{ display: "flex" }}>
              {user.avatar_img ? (
                <Avatar css={styles.avatar} src={user.avatar_img} />
              ) : (
                <Avatar css={styles.avatar}>
                  {user.last_name.slice(0, 1).toUpperCase() +
                    user.first_name.slice(0, 1).toUpperCase()}
                </Avatar>
              )}
              <Box css={styles.name}>
                <Typography variant='h5' component='div'>
                  {user.last_name}
                </Typography>
                <Typography variant='h5' component='div'>
                  {user.first_name}
                </Typography>
              </Box>
            </Box>
            <Box css={styles.comment}>
              <Typography noWrap variant='body2' component='div'>
                {`${user.comment}`}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
      <Popover
        css={styles.popver}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonRemoveIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>ユーザーを削除</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default Org;
