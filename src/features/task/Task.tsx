import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import CommonTable from '../../components/CommonTable';
import TaskDialog from './TaskDialog';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import EastIcon from '@mui/icons-material/East';
import { selectLoginUserInfo } from '../auth/authSlice';
import { selectSelectedProjectId } from '../proj/projectSlice';
import {
  initialEditedTask,
  setTaskDialogOpen,
  setTaskDialogMode,
  setEditedTask,
  setSelectedTask,
  fetchAsyncDeleteTask,
} from './taskSlice';
import { TASK, Status, COLUMN_INFO } from '../types';
import useProjectTask from '../../hooks/projectTask';
import useShapeTask from '../../hooks/shapeTask';
import useMessage from '../../hooks/message';

const columnInfo: COLUMN_INFO[] = [
  {
    name: 'task_name',
    label: 'タスク名',
    type: 'string',
    width: '14%',
    isJsxElement: true,
  },
  {
    name: 'task_category_name',
    label: 'カテゴリー',
    type: 'string',
    width: '10%',
  },
  {
    name: 'status',
    label: 'ステータス',
    type: 'string',
    width: '12%',
    isJsxElement: true,
  },
  {
    name: 'scheduled_startdate',
    label: '開始予定日',
    type: 'Date',
    width: '12%',
    isJsxElement: true,
  },
  {
    name: 'scheduled_enddate',
    label: '終了予定日',
    type: 'Date',
    width: '12%',
    isJsxElement: true,
  },
  {
    name: 'estimate_manhour',
    label: '予定工数(H)',
    type: 'number',
    width: '10%',
  },
  { name: 'assigned_name', label: '担当', type: 'string', width: '14%' },
];

const Task = () => {
  const theme = useTheme();
  const styles = {
    taskStatus: css`
      display: flex;
    `,
  };

  const dispatch = useDispatch();
  const tasks = useProjectTask();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const shapeTask = useShapeTask();
  const message = useMessage();

  // 登録
  const handleRegisterClick = () => {
    dispatch(setTaskDialogMode('register'));
    dispatch(
      setEditedTask({
        ...initialEditedTask,
        project_id: selectedProjectId,
        author_id: loginUserInfo.user_id,
      })
    );
    dispatch(setTaskDialogOpen(true));
  };

  // 更新
  const hendleEditClick = (tasks: TASK[]) => {
    dispatch(setTaskDialogMode('edit'));
    if (tasks.length < 1) {
      message('一覧から編集するタスクを選択してください。');
      return;
    }
    if (tasks.length > 1) {
      message('編集するタスクを一つに絞ってください');
      return;
    }
    dispatch(setEditedTask(shapeTask(tasks[0])));
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
          href='#'
          underline='always'
          onClick={(event: any) => {
            event.stopPropagation();
            dispatch(setTaskDialogMode('detail'));
            dispatch(setSelectedTask(task));
            dispatch(setTaskDialogOpen(true));
          }}
        >
          {task.task_name}
        </Link>
      </Typography>
    ),
    status: (task: TASK) => (
      <div css={styles.taskStatus}>
        <Typography>{Status[task.status]}</Typography>
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
      if (!task.actual_startdate || !task.scheduled_startdate) {
        return <Typography>{task.scheduled_startdate}</Typography>;
      } else {
        if (task.actual_startdate < task.scheduled_startdate) {
          return (
            <div style={{ display: 'flex' }}>
              <Typography>{task.scheduled_startdate}</Typography>
              <NorthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.success.light,
                }}
              />
            </div>
          );
        } else if (task.actual_startdate > task.scheduled_startdate) {
          return (
            <div css={styles.taskStatus}>
              <Typography>{task.scheduled_startdate}</Typography>
              <SouthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.error.light,
                }}
              />
            </div>
          );
        } else {
          return (
            <div css={styles.taskStatus}>
              <Typography>{task.scheduled_startdate}</Typography>
              <EastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.info.light,
                }}
              />
            </div>
          );
        }
      }
    },
    scheduled_enddate: (task: TASK) => {
      if (!task.actual_enddate || !task.scheduled_enddate) {
        return <Typography>{task.scheduled_enddate}</Typography>;
      } else {
        if (task.actual_enddate < task.scheduled_enddate) {
          return (
            <div style={{ display: 'flex' }}>
              <Typography>{task.scheduled_enddate}</Typography>
              <NorthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.success.light,
                }}
              />
            </div>
          );
        } else if (task.actual_enddate > task.scheduled_enddate) {
          return (
            <div css={styles.taskStatus}>
              <Typography>{task.scheduled_enddate}</Typography>
              <SouthEastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.error.light,
                }}
              />
            </div>
          );
        } else {
          return (
            <div css={styles.taskStatus}>
              <Typography>{task.scheduled_enddate}</Typography>
              <EastIcon
                sx={{
                  margin: '0 0 0 8px;',
                  fontSize: 'small',
                  color: theme.palette.info.light,
                }}
              />
            </div>
          );
        }
      }
    },
  };

  return (
    <>
      <CommonTable
        data={tasks}
        elementFactory={elementFactory}
        columnInfo={columnInfo}
        showToolBar={true}
        idColumn='task_id'
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
