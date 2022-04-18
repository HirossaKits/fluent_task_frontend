import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import TaskDialog from './TaskDialog';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import EastIcon from '@mui/icons-material/East';
import { TASK, COLUMN_INFO } from '../types';
import useMessage from '../../hooks/message';
import useCreateOption from '../../hooks/optionCreater';
import useTaskEditPermission from '../../hooks/taskEditPermission';
import { selectLoginUserInfo } from '../auth/authSlice';
import {
  selectSelectedProject,
  selectSelectedProjectId,
} from '../proj/projectSlice';
import {
  initialEditedTask,
  selectTaskCategory,
  setTaskDialogOpen,
  setTaskDialogMode,
  setEditedTask,
  fetchAsyncDeleteTask,
  selectTasks,
} from './taskSlice';
import CommonTable from '../../components/CommonTable';
import CommonTooltip from '../../components/CommonTooltip';
import usePorgress from '../../hooks/ progress';

const Task = () => {
  const theme = useTheme();
  const styles = {
    taskStatus: css`
      display: flex;
    `,
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const message = useMessage();
  const createOption = useCreateOption();
  const taskEditPermisson = useTaskEditPermission();
  const progress = usePorgress();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const selectedProject = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const taskCategory = useSelector(selectTaskCategory);

  console.log(tasks);
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

  const projectMemberOptions = selectedProject.member.map((user) => ({
    value: user.user_id,
    label: `${user.last_name} ${user.first_name}`,
  }));

  const columnInfo: COLUMN_INFO[] = [
    {
      name: 'task_name',
      label: t('task.taskName'),
      type: 'string',
      width: '14%',
      isJsxElement: true,
    },
    {
      name: 'task_category_id',
      label: t('task.category'),
      type: 'select',
      width: '10%',
      selection: taskCategoryOption,
    },
    {
      name: 'status',
      label: t('task.status'),
      type: 'select',
      width: '12%',
      isJsxElement: true,
      selection: statusOptions,
    },
    {
      name: 'scheduled_startdate',
      label: t('task.startDate'),
      type: 'Date',
      width: '12%',
      isJsxElement: true,
    },
    {
      name: 'scheduled_enddate',
      label: t('task.endDate'),
      type: 'Date',
      width: '12%',
      isJsxElement: true,
    },
    {
      name: 'estimate_manhour',
      label: t('task.manHour'),
      type: 'number',
      width: '10%',
    },
    {
      name: 'assigned_id',
      label: t('task.assigned'),
      type: 'select',
      width: '14%',
      selection: projectMemberOptions,
    },
  ];

  // 登録
  const handleRegisterClick = () => {
    dispatch(setTaskDialogMode('register'));
    dispatch(
      setEditedTask({
        ...initialEditedTask,
        project_id: selectedProject.project_id,
        assigned_id: loginUserInfo.user_id,
        author_id: loginUserInfo.user_id,
      })
    );
    dispatch(setTaskDialogOpen(true));
  };

  // 更新
  const hendleEditClick = (tasks: TASK[]) => {
    dispatch(setTaskDialogMode('edit'));
    if (tasks.length < 1) {
      message(t('task.selectTask'));
      return;
    }
    if (tasks.length > 1) {
      message(t('task.narrowDownTask'));
      return;
    }
    if (!taskEditPermisson(tasks)) {
      message(t('task.cannotEditTask'));
      return;
    }
    dispatch(setEditedTask(tasks[0]));
    dispatch(setTaskDialogOpen(true));
  };

  // 削除
  const handleDeleteClick = (tasks: TASK[]) => {
    dispatch(fetchAsyncDeleteTask(tasks));
  };

  const elementFactory = {
    task_name: (task: TASK) => (
      <Typography>
        <Link
          href="#"
          underline="always"
          onClick={(event: any) => {
            event.stopPropagation();
            dispatch(setTaskDialogMode('detail'));
            dispatch(setEditedTask(task));
            dispatch(setTaskDialogOpen(true));
          }}
        >
          {task.task_name}
        </Link>
      </Typography>
    ),
    status: (task: TASK) => (
      <div css={styles.taskStatus}>
        <Typography>
          {
            {
              Suspended: t('status.suspended'),
              'Not started': t('status.notStarted'),
              'On going': t('status.onGoing'),
              Done: t('status.done'),
            }[task.status]
          }
        </Typography>
        <CircleIcon
          sx={{
            margin: '2px 0 0 5px;',
            fontSize: 10,
            color:
              task.status === 'Not started'
                ? theme.palette.warning.light
                : task.status === 'On going'
                ? theme.palette.info.light
                : task.status === 'Done'
                ? theme.palette.success.light
                : theme.palette.text.disabled,
          }}
        />
      </div>
    ),
    scheduled_startdate: (task: TASK) => {
      const prog = progress(task.scheduled_startdate, task.actual_startdate);
      return (
        <div css={styles.taskStatus}>
          <Typography>{task.scheduled_startdate}</Typography>
          {prog === null ? (
            <></>
          ) : prog > 0 ? (
            <CommonTooltip title={`${prog} ${t('task.forward')}`}>
              <NorthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.success.light,
                }}
              />
            </CommonTooltip>
          ) : prog < 0 ? (
            <CommonTooltip title={`${-prog} ${t('task.delay')}`}>
              <SouthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.error.light,
                }}
              />
            </CommonTooltip>
          ) : (
            <CommonTooltip title={t('task.onSchedule')}>
              <EastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.info.light,
                }}
              />
            </CommonTooltip>
          )}
        </div>
      );
    },
    scheduled_enddate: (task: TASK) => {
      const prog = progress(task.scheduled_enddate, task.actual_enddate);
      return (
        <div css={styles.taskStatus}>
          <Typography>{task.scheduled_enddate}</Typography>
          {prog === null ? (
            <></>
          ) : prog > 0 ? (
            <CommonTooltip title={`${prog} ${t('task.forward')}`}>
              <NorthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.success.light,
                }}
              />
            </CommonTooltip>
          ) : prog < 0 ? (
            <CommonTooltip title={`${-prog} ${t('task.delay')}`}>
              <SouthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.error.light,
                }}
              />
            </CommonTooltip>
          ) : (
            <CommonTooltip title={t('task.onSchedule')}>
              <EastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.info.light,
                }}
              />
            </CommonTooltip>
          )}
        </div>
      );
    },
  };

  return (
    <>
      <CommonTable
        data={tasks}
        elementFactory={elementFactory}
        columnInfo={columnInfo}
        showToolBar={selectedProjectId !== 'new_project'}
        idColumn="task_id"
        handleEditClick={hendleEditClick}
        handleRegisterClick={handleRegisterClick}
        handleDeleteClick={handleDeleteClick}
        // selectedIds={selectedIds}
        // setSelectedIds={setSelectedIds}
      />
      <TaskDialog />
    </>
  );
};

export default Task;
