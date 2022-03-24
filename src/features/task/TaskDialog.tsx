import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { Box, IconButton, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CommonTextField from '../../components/CommonTextField';
import CommonDatePicker from '../../components/CommonDatePicker';
import CommonDialog from '../../components/CommonDialog';
import { setEditedTask } from '../task/taskSlice';
import { TARGET } from '../types';
import CommonSelect from '../../components/CommonSelect';
import { Status } from '../../selectionOptions';
import {
  fetchAsyncRegisterTask,
  fetchAsyncUpdateTask,
  selectTaskDialogOpen,
  selectTaskDialogMode,
  selectEditedTask,
  selectTaskCategory,
  setTaskDialogOpen,
  setTaskDialogMode,
} from './taskSlice';
import { selectSelectedProject, setTaskCategory } from '../proj/projectSlice';
import useCreateOption from '../../hooks/optionCreater';
import useMessage from '../../hooks/message';
import { formatISOString } from '../../util/dateHandler';
import SettingsIcon from '@mui/icons-material/Settings';
import CommonTooltip from '../../components/CommonTooltip';
import TaskCategoryDialog from './TaskCategoryDialog';

const TaskDialog: React.FC = () => {
  const theme = useTheme();
  const styles = {
    arrow: css`
      margin: 20px 28px 0 36px;
      color: ${theme.palette.action.active};
    `,
    settings: css`
      margin-top: 28px;
      margin-left: 12px;
    `,
  };

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const createOption = useCreateOption();
  const message = useMessage();
  const project = useSelector(selectSelectedProject);
  const editedTask = useSelector(selectEditedTask);
  // const selectedTask = useSelector(selectSelectedTask);
  const taskDialogOpen = useSelector(selectTaskDialogOpen);
  const taskDialogMode = useSelector(selectTaskDialogMode);
  const taskCategory = useSelector(selectTaskCategory);
  const taskCategoryOption = createOption(
    taskCategory,
    'task_category_id',
    'task_category_name'
  );

  const projectMemberOptions = project.member.map((user) => ({
    value: user.user_id,
    label: `${user.last_name} ${user.first_name}`,
  }));

  const validateInput = (): Boolean => {
    if (!editedTask.task_name) {
      message('タスク名を入力してください。');
      return false;
    }
    if (!editedTask.assigned_id) {
      message('担当者を選択してください。');
      return false;
    }
    return true;
  };

  const handleInputChange = (target: TARGET) => {
    dispatch(setEditedTask({ ...editedTask, [target.name]: target.value }));
  };

  const handleClose = () => {
    dispatch(setTaskDialogOpen(false));
  };

  const handleRegisterClick = () => {
    if (!validateInput()) return;
    dispatch(fetchAsyncRegisterTask());
    dispatch(setTaskDialogOpen(false));
  };

  const handleEditClick = () => {
    console.log('handleEditClick');
    dispatch(fetchAsyncUpdateTask());
    dispatch(setTaskDialogOpen(false));
  };

  const handleEditModeClick = () => {
    dispatch(setTaskDialogMode('edit'));
    dispatch(setEditedTask(editedTask));
  };

  const handleDeleteClick = () => {};

  const handleSettingsClick = () => {
    setCategoryDialogOpen(true);
  };

  const isReadOnly = taskDialogMode === 'detail';

  return (
    <>
      <CommonDialog
        open={taskDialogOpen}
        title={
          taskDialogMode === 'register'
            ? 'タスクを作成'
            : taskDialogMode === 'edit'
            ? 'タスクを編集'
            : 'タスクの詳細'
        }
        onClose={handleClose}
        onRegister={handleRegisterClick}
        onEdit={handleEditClick}
        onEditMode={handleEditModeClick}
        onDelete={handleDeleteClick}
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
          <Stack direction="row">
            <CommonSelect
              label="カテゴリー"
              name="task_category_id"
              options={taskCategoryOption}
              value={editedTask.task_category_id}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
            {(taskDialogMode === 'register' || taskDialogMode === 'edit') && (
              <Box css={styles.settings}>
                <CommonTooltip title="カテゴリー設定">
                  <IconButton onClick={handleSettingsClick}>
                    <SettingsIcon />
                  </IconButton>
                </CommonTooltip>
              </Box>
            )}
          </Stack>
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
            value={editedTask.assigned_id}
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
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
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
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
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
          <CommonTextField
            label="説明"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            width="90%"
            readOnly={isReadOnly}
            rows={2}
          />
          {isReadOnly ? (
            <>
              <CommonSelect
                label="作成者"
                name="assigned"
                options={projectMemberOptions}
                value={editedTask.author_id ?? ''}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
              <CommonTextField
                label="作成日時"
                name="task_name"
                value={formatISOString(editedTask.created_at)}
                readOnly={isReadOnly}
              />
              <CommonTextField
                label="最終更新日時"
                name="task_name"
                value={formatISOString(editedTask.update_at)}
                readOnly={isReadOnly}
              />
            </>
          ) : (
            <></>
          )}
        </Stack>
      </CommonDialog>
      <TaskCategoryDialog
        open={categoryDialogOpen}
        setOpen={setCategoryDialogOpen}
      />
    </>
  );
};

export default TaskDialog;
