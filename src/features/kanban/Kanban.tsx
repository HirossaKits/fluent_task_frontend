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
      padding-bottom+ ${theme.spacing(1)}
    `,
    divider: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    card: css`
      display: flex;
      justify-content: center;
      height: ${theme.spacing(7)};
      margin-top: ${theme.spacing(1)};
      margin-bottom: ${theme.spacing(1)};
      margin-left: ${theme.spacing(2)};
      margin-right: ${theme.spacing(2)};
    `,
    boxTitle: css`
      max-width: 200px;
      display: flex;
      flex-grow: 1;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    `,
    boxStatus: css`
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
      <Card css={styles.wrap}>
        <Box>
          <Typography gutterBottom variant="h6" component="div">
            開始前
          </Typography>
        </Box>
        <Divider css={styles.divider} />
        {demoData.map((task: TASK) => (
          <Card css={styles.card}>
            <Box
              css={styles.boxTitle}
              component="div"
              sx={{
                textOverflow: "ellipsis",
                my: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h6" component="div" noWrap>
                {task.task_name}
              </Typography>
            </Box>
            <Box css={styles.boxStatus}>
              <Typography variant="body1" component="div">
                {task.status}
              </Typography>
            </Box>
            <Box css={styles.boxDot}>
              <IconButton onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
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
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>ユーザーを削除</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default Kanban;
