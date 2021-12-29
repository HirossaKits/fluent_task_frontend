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
  selectTaskDialogMode,
  setTaskDialogOpen,
  setTaskDialogMode,
  setEditedTask,
} from './taskSlice';
import { TASK, Status, COLUMN_INFO } from '../types';

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
    label: '見積工数',
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
      // align-items: center;
    `,
    icon: css`
      // margin: 0px 20px 2px 0px;
    `,
  };

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const mode = useSelector(selectTaskDialogMode);

  const handleRegisterClick = () => {
    dispatch(setTaskDialogMode('register'));
    dispatch(setTaskDialogOpen(true));
  };
  const hendleEditClick = (tasks: TASK[]) => {
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

  const tasksForTable = tasks.map((task) => ({
    ...task,
    task_name: (
      <Typography>
        <Link
          href='#'
          underline='always'
          onClick={(event: any) => {
            event.stopPropagation();
            // setEditTaskOpen(true);
          }}
        >
          {task.task_name}
        </Link>
      </Typography>
    ),
    status: (
      <div css={styles.taskStatus}>
        <Typography>{Status[task.status]}</Typography>
        <CircleIcon
          css={styles.icon}
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
    scheduled_startdate:
      !task.actual_startdate || !task.scheduled_startdate ? (
        <Typography>{Status[task.status]}</Typography>
      ) : task.actual_startdate < task.scheduled_startdate ? (
        <div css={styles.taskStatus}>
          <Typography>{task.scheduled_startdate}</Typography>
          <NorthEastIcon
            sx={{
              margin: '0 0 0 8px;',
              fontSize: 'small',
              color: theme.palette.success.light,
            }}
          />
        </div>
      ) : task.actual_startdate > task.scheduled_startdate ? (
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
      ) : (
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
      ),
    scheduled_enddate:
      !task.actual_enddate || !task.scheduled_enddate ? (
        <Typography>{Status[task.status]}</Typography>
      ) : task.actual_enddate < task.scheduled_enddate ? (
        <div css={styles.taskStatus}>
          <Typography>{task.scheduled_enddate}</Typography>
          <NorthEastIcon
            sx={{
              margin: '0 0 0 8px;',
              fontSize: 'small',
              color: theme.palette.success.light,
            }}
          />
        </div>
      ) : task.actual_enddate > task.scheduled_enddate ? (
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
      ) : (
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
      ),
  }));

  return (
    <>
      <CommonTable
        data={tasksForTable}
        columnInfo={columnInfo}
        showToolBar={true}
        editDialog={<TaskDialog mode={mode} />}
        idColumn='task_id'
        handleEditClick={hendleEditClick}
        handleRegisterClick={handleRegisterClick}
        handleDeleteClick={handleRegisterClick}
        // selectedIds={selectedIds}
        // setSelectedIds={setSelectedIds}
      />
    </>
  );
};

export default Task;
