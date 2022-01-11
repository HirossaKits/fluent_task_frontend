import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CommonTextField from '../../components/CommonTextField';
import CommonDatePicker from '../../components/CommonDatePicker';
import CommonDialog from '../../components/CommonDialog';
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
import useCreateOption from '../../hooks/optionCreater';

type Props = {
  mode: 'register' | 'edit';
};

const TaskDialog: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    arrow: css`
      margin: 20px 28px 0 36px;
      color: ${theme.palette.action.active};
    `,
  };

  const dispatch = useDispatch();
  const createOption = useCreateOption();
  const taskDialogOpen = useSelector(selectTaskDialogOpen);
  const projectMember = useProjectMember();
  const taskCategory = useSelector(selectTaskCategory);
  const taskCategoryOption = createOption(
    taskCategory,
    'task_category_id',
    'task_category_name'
  );
  const editedTask = useSelector(selectEditedTask);

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
    <CommonDialog
      open={taskDialogOpen}
      title={props.mode === 'register' ? 'タスクを登録' : 'タスクを編集'}
      onClose={handleClose}
      maxWidth='sm'
      type='input'
    >
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
      >
        <CommonTextField
          label='タスク名'
          name='title'
          value={editedTask.task_name}
          onChange={handleInputChange}
          width='350px'
        />
        <CommonSelect
          label='カテゴリー'
          name='status'
          options={taskCategoryOption}
          value={editedTask.status}
          onChange={handleInputChange}
        />
        <CommonSelect
          label='ステータス'
          name='status'
          options={Status}
          value={editedTask.status}
          onChange={handleInputChange}
        />
        <CommonSelect
          label='担当者'
          name='assigned'
          options={projectMemberOptions}
          value={editedTask.assigned_name}
          onChange={handleInputChange}
        />
        <CommonTextField
          label='予定工数(H)'
          name='estimate_manhour'
          type='number'
          value={editedTask.estimate_manhour}
          onChange={handleInputChange}
        />
        <CommonTextField
          label='実工数(H)'
          name='actual_manhour'
          type='number'
          value={editedTask.actual_manhour}
          onChange={handleInputChange}
        />
        <Stack direction='row' justifyContent='flex-start' alignItems='center'>
          <CommonDatePicker
            label='開始予定日'
            name='scheduled_startdate'
            value={editedTask.scheduled_startdate}
            onChange={handleInputChange}
          />
          <SwapHorizIcon css={styles.arrow} />
          <CommonDatePicker
            label='終了予定日'
            name='scheduled_enddate'
            value={editedTask.scheduled_enddate}
            onChange={handleInputChange}
          />
        </Stack>
        <Stack direction='row' justifyContent='flex-start' alignItems='center'>
          <CommonDatePicker
            label='開始日'
            name='actual_startdate'
            value={editedTask.actual_startdate}
            onChange={handleInputChange}
          />
          <SwapHorizIcon css={styles.arrow} />
          <CommonDatePicker
            label='終了日'
            name='actual_enddate'
            value={editedTask.actual_enddate}
            onChange={handleInputChange}
          />
        </Stack>
      </Stack>
    </CommonDialog>
  );
};

export default TaskDialog;
