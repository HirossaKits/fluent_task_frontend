import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import el from 'date-fns/esm/locale/el/index.js';
import { TASK } from '../types';

type Props = {
  task: TASK;
};

const KanbanCard: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    card: css`
      cursor: move;
      position: relative;
      display: flex;
      justify-content: space-between;
      min-height: 50px;
      justify-content: space-between;
      height: ${theme.spacing(7)};
      margin-top: ${theme.spacing(2)};
      margin-left: ${theme.spacing(2)};
      margin-right: ${theme.spacing(2)};
    `,
    title: css`
      display: flex;
      flex-grow: 1;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      margin-left: 15px;
    `,
    status: css`
      min-width: 45px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin-left: 10px;
    `,
    dot: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
  };

  const [drag, setDrag] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // useEffect(() => {
  //   if(drag)
  // }, [drag]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    setDrag(true);
    e.dataTransfer.setData(
      'text/plain',
      `${props.task.status}/${props.task.task_id}`
    );
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setDrag(false);
    e.currentTarget.style.opacity = '1';
    e.dataTransfer.clearData('text/plain');
  };

  // const handleOnDrag = (e: React.DragEvent<HTMLElement>) => {
  //   e.currentTarget.style.cursor = 'grabbing';
  //   if (!drag) return;
  //   console.log('drag');
  // };

  // const handleOnMouseDown = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log('mouseDown');
  //   e.currentTarget.style.opacity = '0.5';
  //   e.currentTarget.style.cursor = 'grabbing';
  // };

  // const handleOnMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  //   if (!drag) return;
  //   console.log('mouseMove');
  // };

  // const handleOnMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log('mouseLeave');
  //   e.currentTarget.style.opacity = '1';
  //   e.currentTarget.style.cursor = 'grab';
  // };

  // const handleOnMouseUp = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log('mouseUp');
  //   e.currentTarget.style.opacity = '1';
  //   e.currentTarget.style.cursor = 'grab';
  // };

  return (
    <>
      <Card
        css={styles.card}
        draggable='true'
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          css={styles.title}
          component='div'
          sx={{
            textOverflow: 'ellipsis',
            my: 2,
            overflow: 'hidden',
          }}
        >
          <Typography variant='body1' component='div' noWrap>
            {props.task.task_name}
          </Typography>
        </Box>
        <Box css={styles.status}></Box>
        <Box css={styles.dot}>
          <IconButton onClick={handleClick}>
            <MoreVertIcon fontSize='small' />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default KanbanCard;
