import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import { demoData } from "../../DummyData";
import { TASK } from "../types";
import KanbanColumn from "./KanbanColumn";

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
    container: css`
      display: flex;
      justify-content: space-evenly;
      margin-top: ${theme.spacing(4)};
    `,
    column: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 29%;
      height: 83vh;
      background-color: ${theme.palette.action.hover};
    `,
    header: css`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 12px 3px 0px;
      box-shadow: 0px 0px 12px -5px #777777;
    `,
    iconBeforStart: css`
      color: ${theme.palette.warning.light};
      margin: 0px 14px 2px 0px;
    `,
    iconOnGoing: css`
      color: ${theme.palette.info.light};
      margin: 0px 14px 2px 0px;
    `,
    iconDone: css`
      color: ${theme.palette.success.light};
      margin: 0px 14px 2px 0px;
    `,
    divider: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    card: css`
      display: flex;
      justify-content: space-between;
      height: ${theme.spacing(7)};
      margin-top: ${theme.spacing(1)};
      margin-bottom: ${theme.spacing(1)};
      margin-left: ${theme.spacing(2)};
      margin-right: ${theme.spacing(2)};
    `,
    boxTitle: css`
      display: flex;
      flex-grow: 1;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      margin-left: 15px;
    `,
    boxStatus: css`
      min-width: 45px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin-left: 10px;
    `,
    boxDot: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
  };

  return (
    <>
      <div css={styles.container}>
        {/* <KanbanColumn
          themeColor={theme.palette.warning.light}
          headerText='開始前'
          status='Before Start'
        /> */}
        <Card css={styles.column}>
          <Box css={styles.header}>
            <CircleIcon css={styles.iconBeforStart} />
            <Typography gutterBottom variant='h6' component='div'>
              開始前
            </Typography>
          </Box>
          <Divider css={styles.divider} />
        </Card>
        <Card css={styles.column}>
          <Box css={styles.header}>
            <CircleIcon css={styles.iconOnGoing} />
            <Typography gutterBottom variant='h6' component='div'>
              進行中
            </Typography>
          </Box>
          <Divider css={styles.divider} />
        </Card>
        <Card css={styles.column}>
          <Box css={styles.header}>
            <CircleIcon css={styles.iconDone} />
            <Typography gutterBottom variant='h6' component='div'>
              完了
            </Typography>
          </Box>
          <Divider css={styles.divider} />
          {demoData.map((task: TASK) => (
            <Card css={styles.card}>
              <Box
                css={styles.boxTitle}
                component='div'
                sx={{
                  textOverflow: "ellipsis",
                  my: 2,
                  overflow: "hidden",
                }}
              >
                <Typography variant='body1' component='div' noWrap>
                  {task.task_name}
                </Typography>
              </Box>
              <Box css={styles.boxStatus}>
                <Typography variant='body1' component='div'>
                  {task.status}
                </Typography>
              </Box>
              <Box css={styles.boxDot}>
                <IconButton onClick={handleClick}>
                  <MoreVertIcon fontSize='small' />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Card>
        <Popover
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
      </div>
    </>
  );
};

export default Kanban;
