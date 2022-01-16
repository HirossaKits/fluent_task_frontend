import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { selectTasks } from './taskSlice';
import CommonTable from '../../components/CommonTable';
import TaskDialog from './TaskDialog';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import EastIcon from '@mui/icons-material/East';
import { setMessageOpen, setMessage } from '../main/mainSlice';
import {
  initialTask,
  selectTaskDialogMode,
  setTaskDialogOpen,
  setTaskDialogMode,
  setEditedTask,
} from './taskSlice';
import { TASK, Status, COLUMN_INFO } from '../types';
import useProjectTask from '../../hooks/projectTask';

const columnInfo: COLUMN_INFO[] = [
  {
    name: 'task_name',
    label: 'タスク名',
    type: 'string',
    width: '13%',
    isJsxElement: true,
  },
  { name: 'category_name', label: 'カテゴリー', type: 'string', width: '10%' },
  {
    name: 'status',
    label: 'ステータス',
    type: 'string',
    width: '10%',
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
  { name: 'assigned_name', label: '担当', type: 'string', width: '10%' },
  { name: 'description', label: '備考', type: 'string', width: '15%' },
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
  const mode = useSelector(selectTaskDialogMode);

  const handleRegisterClick = () => {
    dispatch(setTaskDialogMode('register'));
    dispatch(setEditedTask(initialTask));
    dispatch(setTaskDialogOpen(true));
  };

  const hendleEditClick = (tasks: TASK[]) => {
    console.log('res', tasks[0]);
    dispatch(setTaskDialogMode('edit'));
    if (tasks.length < 1) {
      dispatch(setMessage('一覧から編集するタスクを選択してください。'));
      dispatch(setMessageOpen(true));
      return;
    }
    if (tasks.length > 1) {
      dispatch(setMessage('編集するタスクを一つに絞ってください。'));
      dispatch(setMessageOpen(true));
      return;
    }
    dispatch(setEditedTask(tasks[0]));
    dispatch(setTaskDialogOpen(true));
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
                : theme.palette.success.light,
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
        handleDeleteClick={handleRegisterClick}
        // selectedIds={selectedIds}
        // setSelectedIds={setSelectedIds}
      />
      <TaskDialog />
    </>
  );
};

export default Task;
