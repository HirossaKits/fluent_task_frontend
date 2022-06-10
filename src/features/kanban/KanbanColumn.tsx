import React, { useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import useTaskEditPermission from '../../hooks/taskEditPermission';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';
import KanbanCard from './KanbanCard';
import { TASK, TASK_STATUS } from '../types';
import { getTodayString } from '../../util/dateHandler';
import useMessage from '../../hooks/message';
import {
  selectSelectedProject,
  selectSelectedProjectId,
} from '../proj/projectSlice';
import {
  initialEditedTask,
  fetchAsyncUpdateTaskStatus,
  selectTasks,
  setTasks,
  setEditedTask,
  setTaskDialogMode,
  setTaskDialogOpen,
} from '../task/taskSlice';
import { selectLoginUserInfo } from '../auth/authSlice';
// import {parseString} from '../../util/dateHandler'

interface RefValue {
  positions: { [key: string]: { x: number; y: number } };
  isFirstRender: boolean;
}

const animation = (node: HTMLElement, x: number, y: number, delay: number) => {
  node.style.transition = '';
  node.style.transform = `translate(${x}px,${y}px)`;
  setTimeout(() => {
    node.style.transform = '';
    node.style.transition = 'all 300ms';
  }, delay);
};

type Props = {
  status: TASK_STATUS;
  themeColor: string;
  headerText: string;
  tasks: TASK[];
};

const KanbanColumn: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const styles = {
    column: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 20vw;
      height: calc(100vh - 162px);
      // height: ${props.tasks.length * 76}px;
      min-height: 600px;
      margin-bottom: 25px;
      background-color: ${theme.palette.action.hover
        .split(',')
        .map((_, idx) => (idx !== 3 ? _ : ' 0.03)'))
        .join(',')};
    `,
    header: css`
      display: flex;
      height: 32px;
      justify-content: center;
      align-items: center;
      padding-right: 4px;
      cursor: pointer;
      .plus {
        color: transparent;
        margin-left: 12px;
        margin-bottom: 2px;
      }
      &:hover {
        & .plus {
          color: inherit;
          transition: 0.75s;
        }
      }
    `,
    icon: css`
      color: ${props.themeColor};
      margin-right: 20px;
    `,
    dragRange: css`
      position: relative;
      flex: 1;
      overflow: auto;
    `,
    dragOver: css`
      flex: 1;
      border: dashed 3px ${theme.palette.action.disabled};
      // transition: all 80ms ease-out;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `,
    dragLeave: css`
      flex: 1;
      border: dashed 3px transparent;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `,
    cards: css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `,
  };

  const dispatch = useDispatch();
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();
  const taskEditPermisson = useTaskEditPermission();
  const message = useMessage();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);

  const ref = useRef<RefValue>({
    positions: Object.assign(
      {},
      ...props.tasks.map((task) => ({
        [task.task_id]: { x: 0, y: 0 },
      }))
    ),
    isFirstRender: true,
  }).current;

  const kanbanCards = useMemo(() => {
    return props.tasks.map((task, idx) => (
      <div
        ref={(ele) => {
          if (!ele) return;
          const position = ref.positions[task.task_id];
          if (!position) return;
          const rect = ele.getBoundingClientRect();
          if (position.x && position.y) {
            const x = position.x - rect.left;
            const y = position.y - rect.top;
            animation(ele, x, y, 200 - 10 * idx);
          } else {
            if (!ref.isFirstRender) {
              const x = position.x - rect.left;
              animation(ele, x, 0, 300);
            }
          }
          position.x = rect.left;
          position.y = rect.top;
        }}
      >
        <KanbanCard
          task={task}
          user={project.member.find(
            (user) => task.assigned_id === user.user_id
          )}
        />
      </div>
    ));
  }, [props.tasks]);

  const handleStatusClick = () => {
    dispatch(
      setEditedTask({
        ...initialEditedTask,
        project_id: selectedProjectId,
        status: props.status,
        author_id: loginUserInfo.user_id,
      })
    );
    dispatch(setTaskDialogMode('register'));
    dispatch(setTaskDialogOpen(true));
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    ref.isFirstRender = false;
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const data = e.dataTransfer.getData('text/plain');
    const [status, task_id, actual_startdate] = data.split('/');

    const task = tasks.find((task) => task.task_id === task_id);
    if (!task) return;
    if (!taskEditPermisson(task)) {
      message(t('task.cannotEditTask'));
      setDragOver(false);
      return;
    }

    if (props.status !== status) {
      const newTasks = tasks.map((task) => {
        if (task.task_id === task_id) {
          ref.positions[task_id] = { x: 0, y: 0 };
          return { ...task, status: props.status };
        } else {
          return task;
        }
      });

      dispatch(setTasks(newTasks));

      const data = {
        task_id: task_id,
        status: props.status,
        actual_startdate: '',
        actual_enddate: '',
      };

      if (props.status === 'On going') {
        data.actual_startdate = getTodayString();
      }

      if (props.status === 'Done') {
        const todayStr = getTodayString();
        if (!actual_startdate) {
          data.actual_startdate = todayStr;
        } else {
          data.actual_startdate = actual_startdate;
        }
        data.actual_enddate = todayStr;
      }

      dispatch(fetchAsyncUpdateTaskStatus(data));
    }
    setDragOver(false);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Card css={styles.column}>
        <Box css={styles.header} onClick={handleStatusClick}>
          <CircleIcon css={styles.icon} />
          <Typography component="div">{props.headerText}</Typography>
          <Typography className="plus">+</Typography>
        </Box>
        <Divider />
        <div css={styles.dragRange}>
          <div css={dragOver ? styles.dragOver : styles.dragLeave}></div>
          <div css={styles.cards}>{kanbanCards}</div>
        </div>
      </Card>
    </div>
  );
};

export default KanbanColumn;
