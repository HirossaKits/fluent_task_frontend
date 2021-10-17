import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { demoData } from "../../DummyData";
import { TASK } from "../types";

const Kanban = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const styles = {
    wrap: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 30%;
      height: 90vh;
      margin-top: ${theme.spacing(1)};
      padding: ${theme.spacing(1)};
    `,
    card: css`
      display: flex;
      justify-content: center;
      align-content: space-between;
      height: ${theme.spacing(7)};
      margin: ${theme.spacing(1)};
    `,
    dot: css`
      color: ${theme.palette.divider};
    `,
    popver: css`
      box-shadow: none;
    `,
    name: css`
      margin-top: 10px;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      background-color: lgray;
    `,
  };
  return (
    <>
      <Card css={styles.wrap}>
        {demoData.map((task: TASK) => (
          <Card css={styles.card}>
            <Typography variant='h6' component='div'>
              {task.task_name}
            </Typography>
            <Typography variant='body1' component='div'>
              {task.status}
            </Typography>
            <IconButton css={styles.dot} onClick={handleClick}>
              <MoreHorizIcon fontSize='small' />
            </IconButton>
          </Card>
        ))}
      </Card>
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
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>ユーザーを削除</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default Kanban;
