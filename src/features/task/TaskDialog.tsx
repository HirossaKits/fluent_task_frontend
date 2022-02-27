import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CommonTextField from '../../components/CommonTextField';
import CommonDatePicker from '../../components/CommonDatePicker';
import CommonDialog from '../../components/CommonDialog';
import CommonTypography from '../../components/CommonTypography';
import { selectEditedTask } from '../task/taskSlice';
import { setEditedTask } from '../task/taskSlice';
import { TARGET } from '../types';
import CommonSelect from '../../components/CommonSelect';
import { Status } from '../../selectionOptions';
import {
  selectTaskDialogOpen,
  selectTaskDialogMode,
  setTaskDialogOpen,
  setTaskDialogMode,
} from './taskSlice';
import { selectSelectedProject, setTaskCategory } from '../proj/projectSlice';
import { DIALOG_MODE } from '../types';

// remove later
import useCreateOption from '../../hooks/optionCreater';

// type Props = {
//   mode: DIALOG_MODE;
// };

const TaskDialog: React.FC = () => {
  const theme = useTheme();
  const styles = {
    arrow: css`
      margin: 20px 28px 0 36px;
      color: ${theme.palette.action.active};
    `,
  };

  const dispatch = useDispatch();
  const createOption = useCreateOption();
  const project = useSelector(selectSelectedProject);
  const taskDialogOpen = useSelector(selectTaskDialogOpen);
  const taskDialogMode = useSelector(selectTaskDialogMode);
  const taskCategoryOption =
    project &&
    createOption(
      project.task_category,
      'task_category_id',
      'task_category_name'
    );
  const editedTask = useSelector(selectEditedTask);

  const projectMemberOptions = project.member.map((user) => ({
    value: user.user_id,
    label: `${user.last_name} ${user.first_name}`,
  }));

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedTask({ ...editedTask, [target.name]: target.value }));
  };

  const handleClose = () => {
    dispatch(setTaskDialogOpen(false));
  };

  const handleEditClick = () => {
    dispatch(setTaskDialogMode('edit'));
  };

  const handleDeleteClick = () => {};

  const isReadOnly = taskDialogMode === 'detail';

  return (
    <CommonDialog
      open={taskDialogOpen}
      title={
        taskDialogMode === 'register'
          ? 'タスクを登録'
          : taskDialogMode === 'edit'
          ? 'タスクを編集'
          : 'タスク詳細'
      }
      onClose={handleClose}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      maxWidth="sm"
      mode={taskDialogMode}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <CommonTextField
          label="タスク名"
          name="task_name"
          value={editedTask.task_name}
          onChange={handleInputChange}
          width="350px"
          readOnly={isReadOnly}
        />
        <CommonSelect
          label="カテゴリー"
          name="category_id"
          options={taskCategoryOption}
          value={editedTask.category_id ?? ''}
          onChange={handleInputChange}
          readOnly={isReadOnly}
        />
        <CommonSelect
          label="ステータス"
          name="status"
          options={Status}
          value={editedTask.status}
          onChange={handleInputChange}
          readOnly={isReadOnly}
        />
        <CommonSelect
          label="担当者"
          name="assigned_id"
          options={projectMemberOptions}
          value={editedTask.assigned_id ?? ''}
          onChange={handleInputChange}
          readOnly={isReadOnly}
        />
        <CommonTextField
          label="予定工数(H)"
          name="estimate_manhour"
          type="number"
          value={editedTask.estimate_manhour}
          onChange={handleInputChange}
          readOnly={isReadOnly}
        />
        <CommonTextField
          label="実工数(H)"
          name="actual_manhour"
          type="number"
          value={editedTask.actual_manhour}
          onChange={handleInputChange}
          readOnly={isReadOnly}
        />
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <CommonDatePicker
            label="開始予定日"
            name="scheduled_startdate"
            value={editedTask.scheduled_startdate}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
          <SwapHorizIcon css={styles.arrow} />
          <CommonDatePicker
            label="終了予定日"
            name="scheduled_enddate"
            value={editedTask.scheduled_enddate}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <CommonDatePicker
            label="開始日"
            name="actual_startdate"
            value={editedTask.actual_startdate}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
          <SwapHorizIcon css={styles.arrow} />
          <CommonDatePicker
            label="終了日"
            name="actual_enddate"
            value={editedTask.actual_enddate}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </Stack>
        {taskDialogMode === 'detail' ? (
          <>
            <CommonSelect
              label="作成者"
              name="assigned"
              options={projectMemberOptions}
              value={editedTask.assigned_id ?? ''}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
            <CommonTextField
              label="作成日時"
              name="task_name"
              value={editedTask.created_at}
              readOnly={isReadOnly}
            />
            <CommonTextField
              label="最終更新日時日時"
              name="task_name"
              value={editedTask.created_at}
              readOnly={isReadOnly}
            />
          </>
        ) : (
          <></>
        )}
      </Stack>
      {/* </> */}
    </CommonDialog>
  );
};

export default TaskDialog;
