import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks } from '../task/taskSlice';
import { setIsFirstRender } from './kanbanSlice';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import { demoData } from '../../DummyData';
import { TASK } from '../types';
import KanbanColumn from './KanbanColumn';
import useProjectTask from '../../hooks/projectTask';

interface RefValue {
  positions: { [key: string]: { x: number; y: number } };
  isFirstRender: boolean;
}

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
      padding: 6px 36px 4px 0px;
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
    userCard: css`
      width: 320px;
      text-align: left;
    `,
    listTitle: css`
      margin: 10px 20px;
    `,
  };

  const tasks = useProjectTask();

  return (
    <>
      <div css={styles.container}>
        <KanbanColumn
          themeColor={theme.palette.warning.light}
          status='Not started'
          headerText='開始前'
          tasks={tasks.filter((task) => task.status === 'Not started')}
        />
        <KanbanColumn
          themeColor={theme.palette.info.light}
          status='On going'
          headerText='進行中'
          tasks={tasks.filter((task) => task.status === 'On going')}
        />
        <KanbanColumn
          themeColor={theme.palette.success.light}
          status='Done'
          headerText='完了'
          tasks={tasks.filter((task) => task.status === 'Done')}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
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
