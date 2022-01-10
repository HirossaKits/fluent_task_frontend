import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommonAvatar from '../../components/CommonAvatar';
import CommonTooltip from '../../components/CommonTooltip';

import { ORG_USER, TASK } from '../types';

type Props = {
  task: TASK;
  user: ORG_USER | undefined;
};

const KanbanCard: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    card: css`
      cursor: move;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 50px;
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
    user: css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
    `,
    dot: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
  };

  // const [drag, setDrag] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    // setDrag(true);
    e.dataTransfer.setData(
      'text/plain',
      `${props.task.status}/${props.task.task_id}`
    );
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    // setDrag(false);
    e.currentTarget.style.opacity = '1';
    e.dataTransfer.clearData();
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      css={styles.card}
      draggable
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
        <Typography component='div' noWrap>
          {props.task.task_name}
        </Typography>
      </Box>
      <Box css={styles.user}>
        <CommonAvatar user={props.user} />
      </Box>
      <Box css={styles.dot}>
        <IconButton onClick={handleClick}>
          <MoreVertIcon fontSize='small' />
        </IconButton>
      </Box>
    </Card>
  );
};

export default KanbanCard;
