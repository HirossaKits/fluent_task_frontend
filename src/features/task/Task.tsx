import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import TaskDialog from './TaskDialog';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import EastIcon from '@mui/icons-material/East';
import { TASK, Status, COLUMN_INFO } from '../types';
import useShapeTask from '../../hooks/shapeTask';
import useMessage from '../../hooks/message';
import useCreateOption from '../../hooks/optionCreater';
import useTaskEditPermission from '../../hooks/taskEditPermission';
import { selectLoginUserInfo } from '../auth/authSlice';
import { selectSelectedProjectId } from '../proj/projectSlice';
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

const Task = () => {
  const theme = useTheme();
  const styles = {
    taskStatus: css`
      display: flex;
    `,
  };

  const dispatch = useDispatch();
  const shapeTask = useShapeTask();
  const message = useMessage();
  const createOption = useCreateOption();
  const taskEditPermisson = useTaskEditPermission();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const tasks = useSelector(selectTasks);
  const taskCategory = useSelector(selectTaskCategory);
  const taskCategoryOption = createOption(
    taskCategory,
    'task_category_id',
    'task_category_name'
  );

  const columnInfo: COLUMN_INFO[] = [
    {
      name: 'task_name',
      label: 'タスク名',
      type: 'string',
      width: '14%',
      isJsxElement: true,
    },
    {
      name: 'task_category_id',
      label: 'カテゴリー',
      type: 'select',
      width: '10%',
      selection: taskCategoryOption,
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

  // 登録
  const handleRegisterClick = () => {
    dispatch(setTaskDialogMode('register'));
    dispatch(
      setEditedTask({
        ...initialEditedTask,
        project_id: selectedProjectId,
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
      message('一覧から編集するタスクを選択してください。');
      return;
    }
    if (tasks.length > 1) {
      message('編集するタスクを一つに絞ってください');
      return;
    }
    if (!taskEditPermisson(tasks)) {
      message(
        'タスクの担当者、作成者、またはプロジェクトに管理者のみ編集可能です。'
      );
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
          href="#"
          underline="always"
          onClick={(event: any) => {
            event.stopPropagation();
            dispatch(setTaskDialogMode('detail'));
            dispatch(setEditedTask(shapeTask(task)));
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
