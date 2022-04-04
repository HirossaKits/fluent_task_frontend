import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FeedIcon from '@mui/icons-material/Feed';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { USER_INFO, TASK } from '../types';
import useConcatUserName from '../../hooks/userName';
import {
  setEditedTask,
  setTaskDialogMode,
  setTaskDialogOpen,
  fetchAsyncDeleteTask,
} from '../task/taskSlice';
import CommonAvatar from '../../components/CommonAvatar';
import CommonTooltip from '../../components/CommonTooltip';

type Props = {
  task: TASK;
  user: USER_INFO | undefined;
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
    titleWrap: css`
      width: calc(100% - 75px);
      white-space: nowrap;
      text-align: left;
      padding: 0 10px 0 15px;
    `,
    user: css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
    `,
    dot: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 35px;
    `,
    menuItem: css`
      padding-right: ${theme.spacing(3)};
    `,
  };

  const [drag, setDrag] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const concatUserName = useConcatUserName();

  const handleDotClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDetailClick = () => {
    dispatch(setEditedTask(props.task));
    dispatch(setTaskDialogMode('detail'));
    dispatch(setTaskDialogOpen(true));
  };
  const handleEditClick = () => {
    dispatch(setEditedTask(props.task));
    dispatch(setTaskDialogMode('edit'));
    dispatch(setTaskDialogOpen(true));
  };
  const handleDeleteClick = () => {
    dispatch(fetchAsyncDeleteTask([props.task]));
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    setDrag(true);
    e.dataTransfer.setData(
      'text/plain',
      `${props.task.status}/${props.task.task_id}/${props.task.actual_startdate}`
    );
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setDrag(false);
    e.currentTarget.style.opacity = '1';
    e.dataTransfer.clearData();
  };

  // const handleOnDrag = (e: React.DragEvent<HTMLElement>) => {
  //   e.currentTarget.style.cursor = 'grabbing';
  //   if (!drag) return;
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
    <>
      <Card
        css={styles.card}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div css={styles.titleWrap}>
          <Box
            component='div'
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              typography: 'body2',
            }}
          >
            {props.task.task_name}
          </Box>
        </div>
        <Box css={styles.user}>
          <CommonTooltip
            title={`${t('kanban.assigned')} : ${concatUserName(props.user)}`}
          >
            <div>
              <CommonAvatar user={props.user} />
            </div>
          </CommonTooltip>
        </Box>
        <Box css={styles.dot}>
          <IconButton onClick={handleDotClick}>
            <MoreVertIcon fontSize='small' />
          </IconButton>
        </Box>
      </Card>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleDetailClick}>
          <ListItemIcon>
            <FeedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText css={styles.menuItem}>
            {t('kanban.detail')}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText css={styles.menuItem}>{t('kanban.edit')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText css={styles.menuItem}>
            {t('kanban.remove')}
          </ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default KanbanCard;
