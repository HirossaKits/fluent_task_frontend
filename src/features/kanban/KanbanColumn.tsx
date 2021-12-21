import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks } from '../task/taskSlice';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CircleIcon from '@mui/icons-material/Circle';
import KanbanCard from './KanbanCard';
import { demoData } from '../../DummyData';
import { TASK } from '../types';

type Props = {
  themeColor: string;
  headerText: string;
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
      width: 27vw;
      height: 83vh;
      background-color: ${theme.palette.action.hover};
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

  const tasks = useSelector(selectTasks);

  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: any) => {
    setDragOver(false);
  };

  const handleDrop = (e: any) => {
    setDragOver(false);
  };

  // 要素が重なった際のイベントを定義
  const handleDragEnter = (e: any) => {};

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
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
        {/* <Stack spacing={2} css={styles.stack}>
          {demoData.map((task: TASK) => (
            <KanbanCard title={task.task_name} status={task.status} />
          ))}
        </Stack> */}
        <Box css={dragOver ? styles.dragOver : styles.dragLeave}>
          {demoData.map((task) => (
            <KanbanCard title={task.task_name} />
          ))}
        </Box>
      </Card>
    </div>
  );
};

export default KanbanColumn;
