import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CommonTextField from '../../components/CommonTextField';
import CommonDatePicker from '../../components/CommonDatePicker';
import CommonDialog from '../../components/CommonDialog';
import { setEditedTask } from '../task/taskSlice';
import { TARGET } from '../types';
import CommonSelect from '../../components/CommonSelect';
// import { Status } from '../../selectionOptions';
import {
  selectTaskDialogOpen,
  selectTaskDialogMode,
  selectEditedTask,
  selectTaskCategory,
  setTaskDialogOpen,
  setTaskDialogMode,
  fetchAsyncRegisterTask,
  fetchAsyncUpdateTask,
  fetchAsyncDeleteTask,
} from './taskSlice';
import { selectSelectedProject } from '../proj/projectSlice';
import useCreateOption from '../../hooks/optionCreater';
import useMessage from '../../hooks/message';
import { formatISOString } from '../../util/dateHandler';
import SettingsIcon from '@mui/icons-material/Settings';
import CommonTooltip from '../../components/CommonTooltip';
import TaskCategoryDialog from './TaskCategoryDialog';
import useTaskEditPermission from '../../hooks/taskEditPermission';

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
  const { t } = useTranslation();
  const createOption = useCreateOption();
  const taskEditPermisson = useTaskEditPermission();
  const message = useMessage();
  const project = useSelector(selectSelectedProject);
  const editedTask = useSelector(selectEditedTask);
  const taskDialogOpen = useSelector(selectTaskDialogOpen);
  const taskDialogMode = useSelector(selectTaskDialogMode);
  const taskCategory = useSelector(selectTaskCategory);
  const taskCategoryOption = createOption(
    taskCategory,
    'task_category_id',
    'task_category_name'
  );

  const statusOptions = [
    {
      value: 'Not started',
      label: t('status.notStarted'),
    },
    {
      value: 'On going',
      label: t('status.onGoing'),
    },
    {
      value: 'Done',
      label: t('status.done'),
    },
    {
      value: 'Suspended',
      label: t('status.suspended'),
    },
  ];

  const projectMemberOptions = project.member.map((user) => ({
    value: user.user_id,
    label: `${user.last_name} ${user.first_name}`,
  }));

  const validateInput = (): Boolean => {
    if (!editedTask.task_name) {
      message(t('taskDialog.requireTaskName'));
      return false;
    }
    if (!editedTask.assigned_id) {
      message(t('taskDialog.requireAssigned'));
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

    if (editedTask.status === 'Suspended') {
      // 何もしない
    } else if (editedTask.actual_enddate) {
      dispatch(
        setEditedTask({
          ...editedTask,
          status: 'Done',
        })
      );
    } else if (editedTask.actual_startdate) {
      dispatch(
        setEditedTask({
          ...editedTask,
          status: 'On going',
        })
      );
    } else {
      dispatch(
        setEditedTask({
          ...editedTask,
          status: 'Not started',
        })
      );
    }

    dispatch(fetchAsyncRegisterTask());
    dispatch(setTaskDialogOpen(false));
  };

  const handleEditClick = () => {
    dispatch(fetchAsyncUpdateTask());
    dispatch(setTaskDialogOpen(false));
  };

  const handleDeleteClick = () => {
    if (!taskEditPermisson(editedTask)) {
      message(t('task.cannotEditTask'));
      return;
    }
    dispatch(fetchAsyncDeleteTask([editedTask]));
    dispatch(setTaskDialogOpen(false));
  };

  const handleEditModeClick = () => {
    if (!taskEditPermisson(editedTask)) {
      message(t('task.cannotEditTask'));
      return;
    }
    dispatch(setTaskDialogMode('edit'));
    dispatch(setEditedTask(editedTask));
  };

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
            ? t('taskDialog.addTask')
            : taskDialogMode === 'edit'
            ? t('taskDialog.editTask')
            : t('taskDialog.taskDetails')
        }
        onClose={handleClose}
        onRegister={handleRegisterClick}
        onEdit={handleEditClick}
        onEditMode={handleEditModeClick}
        onDelete={handleDeleteClick}
        maxWidth="sm"
        maxHeight="750px"
        mode={taskDialogMode}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <CommonTextField
            label={t('taskDialog.taskName')}
            name="task_name"
            value={editedTask.task_name}
            onChange={handleInputChange}
            width="350px"
            readOnly={isReadOnly}
          />
          <Stack direction="row">
            <CommonSelect
              label={t('taskDialog.category')}
              name="task_category_id"
              options={taskCategoryOption}
              value={editedTask.task_category_id}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
            {(taskDialogMode === 'register' || taskDialogMode === 'edit') && (
              <Box css={styles.settings}>
                <CommonTooltip title={t('taskDialog.categorySettings')}>
                  <IconButton onClick={handleSettingsClick}>
                    <SettingsIcon />
                  </IconButton>
                </CommonTooltip>
              </Box>
            )}
          </Stack>
          <CommonSelect
            label={t('taskDialog.status')}
            name="status"
            options={statusOptions}
            value={editedTask.status}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
          <CommonSelect
            label={t('taskDialog.assigned')}
            name="assigned_id"
            options={projectMemberOptions}
            value={editedTask.assigned_id}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
          <CommonTextField
            label={t('taskDialog.sManHour')}
            name="estimate_manhour"
            type="number"
            minVal={1}
            value={editedTask.estimate_manhour}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
          <CommonTextField
            label={t('taskDialog.aManHour')}
            name="actual_manhour"
            type="number"
            minVal={1}
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
              label={t('taskDialog.sStartDate')}
              name="scheduled_startdate"
              value={editedTask.scheduled_startdate}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
            <SwapHorizIcon css={styles.arrow} />
            <CommonDatePicker
              label={t('taskDialog.sEndDate')}
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
              label={t('taskDialog.aStartDate')}
              name="actual_startdate"
              value={editedTask.actual_startdate}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
            <SwapHorizIcon css={styles.arrow} />
            <CommonDatePicker
              label={t('taskDialog.aEndDate')}
              name="actual_enddate"
              value={editedTask.actual_enddate}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
          </Stack>
          <CommonTextField
            label={t('taskDialog.description')}
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
                label={t('taskDialog.author')}
                name="author_id"
                options={projectMemberOptions}
                value={editedTask.author_id ?? ''}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
              <CommonTextField
                label={t('taskDialog.createdAt')}
                name="created_at"
                value={formatISOString(editedTask.created_at)}
                readOnly={isReadOnly}
              />
              <CommonTextField
                label={t('taskDialog.updateAt')}
                name="update_at"
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
