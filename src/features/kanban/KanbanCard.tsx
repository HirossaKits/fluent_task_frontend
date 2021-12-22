import React, { useState, useRef, MouseEvent } from 'react';
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
  disabled?: boolean;
  onDrop?(): void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

interface Position {
  left: number;
  top: number;
}

type DnDRef = {
  pointerPosition: Position;
  elementPosition: Position;
  element: HTMLElement | null;
};

const KanbanCard: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    grab: css`
      cursor: grab;
    `,
    grabbing: css`
      cursor: grabing;
    `,
    card: css`
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDragStart = (e: any) => {
    setDrag(true);
    e.dataTransfer.setData('text/html', e.target.current);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <div
        id={`task-${props.task.task_id}`}
        css={styles.grab}
        draggable='true'
        // onMouseMove={handleOnMouseMove}
        // onMouseDown={handleOnMouseDown}
        // onMouseMove={handleOnMouseMove}
        // onMouseUp={handleOnMouseUp}
        onDragStart={handleDragStart}
      >
        <Card
          draggable='true'
          // onMouseMove={handleOnMouseMove}
          // onMouseDown={handleOnMouseDown}
          // onMouseMove={handleOnMouseMove}
          // onMouseUp={handleOnMouseUp}
          onDragStart={handleDragStart}
          css={styles.card}
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
      </div>
      {/* <div
        onDragOver={(e) => {
          if (disabled) return;
          e.preDefault();
          onDragOver(() => setIsTarget(false));
        }}
        onDragEnter={() => {
          if (disabled || dragOver.current) return;

          setIsTarget(true);
        }}
        onDrop={() => {
          if (disabled) return;

          setIsTarget(false);
          onDrop?.();
        }}
      ></div> */}
    </>

    // <Popover
    //   open={Boolean(anchorEl)}
    //   anchorEl={anchorEl}
    //   onClose={handleClose}
    //   anchorOrigin={{
    //     vertical: "bottom",
    //     horizontal: "left",
    //   }}
    // >
    //   <MenuItem>
    //     <ListItemIcon>
    //       <EditIcon fontSize='small' />
    //     </ListItemIcon>
    //     <ListItemText>タスクをを編集</ListItemText>
    //     <ListItemText>タスクを削除</ListItemText>
    //   </MenuItem>
    // </Popover>

    // const ref = useRef<DnDRef>({
    //   pointerPosition: { left: 0, top: 0 },
    //   elementPosition: { left: 0, top: 0 },
    //   element: null,
    // }).current;

    // const onMouseMove = (e: MouseEvent) => {
    //   if (!ref.element) return;
    //   const { clientX, clientY } = e;
    //   const left = clientX - ref.pointerPosition.left;
    //   const top = clientY - ref.pointerPosition.top;

    //   ref.element.style.zIndex = '10';
    //   ref.element.style.cursor = 'grabbing';
    //   ref.element.style.transform = `translate(${left}px,${top}px)`;
    // };

    // const onMouseDown = (e: MouseEvent<HTMLElement>) => {
    //   ref.element = e.currentTarget;
    //   ref.pointerPosition.left = e.clientX;
    //   ref.pointerPosition.top = e.clientY;
    //   ref.elementPosition = e.currentTarget.getBoundingClientRect();
    //   ref.element.style.transition = '';
    //   ref.element.style.cursor = 'grabbing';
    //   // window.addEventListener('mouseup', onmouseup);
    //   // window.addEventListener('mousemove', onMouseMove);
    // };

    // const onMouseUp = (e: MouseEvent) => {
    //   if (!ref.element) return;

    //   // ドラッグしてる要素に適用していたCSSを削除
    //   ref.element.style.zIndex = '';
    //   ref.element.style.cursor = '';
    //   ref.element.style.transform = '';

    //   ref.element = null;

    //   // window.removeEventListener('mouseup', onMouseUp);
    //   // window.removeEventListener('mousemove', onMouseMove);
    // };
  );
};

export default KanbanCard;
