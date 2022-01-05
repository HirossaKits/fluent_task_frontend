import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CommonTextField from '../../components/CommonTextField';
import CommonDatePicker from '../../components/CommonDatePicker';
import { selectEditedTask } from '../task/taskSlice';
import { setEditedTask } from '../task/taskSlice';
import { TARGET } from '../types';
import CommonSelect from '../../components/CommonSelect';
import { Status } from '../../selectionOptions';
import { selectTaskDialogOpen, setTaskDialogOpen } from './taskSlice';
import {
  selectSelectedProject,
  selectTaskCategory,
  setTaskCategory,
} from '../proj/projectSlice';
import useProjectMember from '../../hooks/projectMember';
// remove later
import { dummyUsers } from '../../DummyData';

type Props = {
  mode: 'register' | 'edit';
};

const TaskDialog: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    form: css`
      width: 100%;
    `,
    title: css`
      margin-left: ${theme.spacing(3)};
    `,
    close: css`
      margin: 10px;
    `,
    gridCol: css`
      textalign: center;
    `,
    arrowIcon: css`
      margin-left: 35%;
      margin-bottom: 10px;
      color: ${theme.palette.action.active};
    `,
  };

  const dispatch = useDispatch();
  const projectMember = useProjectMember();
  const taskDialogOpen = useSelector(selectTaskDialogOpen);
  const selectedProject = useSelector(selectSelectedProject);
  const editedTask = useSelector(selectEditedTask);
  const taskCategory = useSelector(selectTaskCategory);

  const projectMemberOptions = projectMember.map((user) => ({
    value: user.user_id,
    label: `${user.last_name} ${user.first_name}`,
  }));

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedTask({ ...editedTask, [target.name]: target.value }));
  };

  const handleClose = () => {
    dispatch(setTaskDialogOpen(false));
  };

  return (
    <>
      <Dialog
        open={taskDialogOpen}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth='sm'
        fullWidth
      >
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid css={styles.title} item>
            <DialogTitle>
              {props.mode === 'register' ? 'タスクを登録' : 'タスクを編集'}
            </DialogTitle>
          </Grid>
          <Grid css={styles.close} item>
            <IconButton size='small' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <form css={styles.form} noValidate autoComplete='off'>
          <Grid container direction='row' justifyContent='center'>
            <Grid
              css={styles.gridCol}
              container
              justifyContent='flex-start'
              alignItems='center'
              xs={10}
            >
              <Grid item xs={12}>
                <Grid item xs={10}>
                  <CommonTextField
                    label='プロジェクト'
                    name='title'
                    value={editedTask.task_name}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={10}>
                  <CommonTextField
                    label='タスク名'
                    name='title'
                    value={editedTask.task_name}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <CommonSelect
                    label='カテゴリー'
                    name='status'
                    options={projectMemberOptions}
                    value={editedTask.status}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={3}>
                  <CommonSelect
                    label='ステータス'
                    name='status'
                    options={Status}
                    value={editedTask.status}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={4}>
                  <CommonSelect
                    label='担当者'
                    name='assigned'
                    options={projectMemberOptions}
                    value={editedTask.assigned_name}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                xs={12}
                direction='row'
                justifyContent='flex-start'
                alignItems='flex-end'
              >
                <Grid item xs={2}>
                  <CommonTextField
                    label='見積工数'
                    name='estimate_manhour'
                    type='number'
                    value={editedTask.estimate_manhour}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SwapHorizIcon css={styles.arrowIcon} />
                </Grid>
                <Grid item xs={2}>
                  <CommonTextField
                    label='実工数'
                    name='actual_manhour'
                    type='number'
                    value={editedTask.actual_manhour}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                xs={12}
                direction='row'
                justifyContent='flex-start'
                alignItems='flex-end'
              >
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='開始予定日'
                    name='scheduled_startdate'
                    value={editedTask.scheduled_startdate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SwapHorizIcon css={styles.arrowIcon} />
                </Grid>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='開始日'
                    name='actual_startdate'
                    value={editedTask.actual_startdate}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                xs={12}
                direction='row'
                justifyContent='flex-start'
                alignItems='flex-end'
              >
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='終了予定日'
                    name='scheduled_endate'
                    value={editedTask.scheduled_startdate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SwapHorizIcon css={styles.arrowIcon} />
                </Grid>
                <Grid item xs={4}>
                  <CommonDatePicker
                    label='終了日'
                    name='actual_enddate'
                    value={editedTask.actual_enddate}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              キャンセル
            </Button>
            <Button onClick={handleClose} color='primary'>
              登録
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TaskDialog;
