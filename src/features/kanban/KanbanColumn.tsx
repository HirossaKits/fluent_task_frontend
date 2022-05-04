import React, { useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
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
import { selectLoginUserInfo } from '../auth/authSlice';
import { selectSelectedProject } from '../proj/projectSlice';
import {
  fetchAsyncUpdateTaskStatus,
  selectTasks,
  setTasks,
} from '../task/taskSlice';

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
      justify-content: center;
      align-items: center;
      padding: 6px 36px 4px 0px;
    `,
    icon: css`
      color: ${props.themeColor};
      margin: 0px 20px 2px 0px;
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
  const message = useMessage();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const tasks = useSelector(selectTasks);
  const project = useSelector(selectSelectedProject);
  const [dragOver, setDragOver] = useState(false);

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

    if (
      !project.resp_id.includes(loginUserInfo.user_id) &&
      !project.member_id.includes(loginUserInfo.user_id)
    ) {
      message('タスクの担当者、作成者、プロジェクトの管理者のみ変更可能です。');
      setDragOver(false);
      return;
    }

    const data = e.dataTransfer.getData('text/plain');
    const [status, task_id, actual_startdate] = data.split('/');
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
        <Box css={styles.header}>
          <CircleIcon css={styles.icon} />{' '}
          <Typography gutterBottom component="div">
            {props.headerText}
          </Typography>
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
