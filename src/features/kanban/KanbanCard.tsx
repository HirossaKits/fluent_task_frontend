import React, { useState, useRef } from 'react';
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

type Props = {
  title: string;
  disabled?: boolean;
  onDrop?(): void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const KanbanCard: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    container: css`
      opacity: 1;
    `,
    card: css`
      cursor: move;
      draggable: true;
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function useDragAutoLeave(timeout: number = 100) {
    const dragOver = useRef(false);
    const timer = useRef(0);
    return [
      dragOver,
      (onDragLeave?: () => void) => {
        clearTimeout(timer.current);
        dragOver.current = true;
        // timer.current = setTimeout(() => {
        //   dragOver.current = false;
        //   onDragLeave?.();
        // }, timeout);
      },
    ] as const;
  }

  return (
    <>
      <div
        draggable='true'
        // onDragStart={(e) => handleDragStart(e)}
        // onDragEnd={(e) => handleDragEnd(e)}
        // onDragOver={(e) => handleDragOver(e)}
        // onDrop={(e) => handleDrop(e)}
      >
        <Card css={styles.card}>
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
              {props.title}
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
          e.preventDefault();
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
  );
};

export default KanbanCard;
