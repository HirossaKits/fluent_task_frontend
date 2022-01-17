import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, setTasks } from '../task/taskSlice';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';
import KanbanCard from './KanbanCard';
import { TASK, TASK_STATUS } from '../types';
import useProjectMember from '../../hooks/projectMember';

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
    stack: css`
      padding: ${theme.spacing(2)};
      overflow: auto;
    `,
    column: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 20vw;
      height: 83vh;
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
    dragOver: css`
      flex: 1;
      border: dashed 3px ${theme.palette.action.disabled};
      transition: all 80ms ease-out;
    `,
    dragLeave: css`
      flex: 1;
      border: dashed 3px transparent;
    `,
  };

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const projectMember = useProjectMember();
  const [dragOver, setDragOver] = useState(false);

  const ref = useRef<RefValue>({
    positions: Object.assign(
      {},
      ...tasks.map((task) => ({
        [task.task_id]: { x: 0, y: 0 },
      }))
    ),
    isFirstRender: true,
  }).current;

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    ref.isFirstRender = false;
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const [status, task_id] = data.split('/');
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
          <CircleIcon css={styles.icon} />
          <Typography gutterBottom component='div'>
            {props.headerText}
          </Typography>
        </Box>
        <Divider />
        <Box css={dragOver ? styles.dragOver : styles.dragLeave}>
          {props.tasks.map((task, idx) => (
            <div
              ref={(ele) => {
                if (!ele) return;
                const position = ref.positions[task.task_id];
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
                user={projectMember.find(
                  (user) => task.assigned_id === user.user_id
                )}
              />
            </div>
          ))}
        </Box>
      </Card>
    </div>
  );
};

export default KanbanColumn;
