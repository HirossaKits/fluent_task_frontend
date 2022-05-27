import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useCreateGanttChartBar from '../../hooks/ganttChart';
import { selectSelectedProject } from '../proj/projectSlice';
import {
  selectTasks,
  setEditedTask,
  setTaskDialogMode,
  setTaskDialogOpen,
} from '../task/taskSlice';
import { parseString, getDateSpan } from '../../util/dateHandler';
import { GANTTCHART_CELL_STYLE } from '../types';

const cellStyle: GANTTCHART_CELL_STYLE = {
  width: 16,
  height: 32,
};

const barStyle = {
  topPosition: 32,
  height: 22,
  span: 4,
  roundEdge: 6,
};

const GanttChart = () => {
  const theme = useTheme();
  const styles = {
    table: css`
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.divider};
      border-collapse: collapse;
      th {
        border-right: 1px solid;
        border-bottom: 1px solid;
        border-color: ${theme.palette.divider};
      }
      td {
        border-right: 1px solid;
        border-bottom: 1px solid;
        border-color: ${theme.palette.divider};
        height: ${cellStyle.height}px;
      }
    `,
    taskName: css`
      width: 1000px;
    `,
  };

  const dispatch = useDispatch();
  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const createGanttChartBar = useCreateGanttChartBar();

  const startDate = new Date(project.startdate);
  const endDate = new Date(project.enddate);

  const days = getDateSpan(endDate, startDate);

  const dates = [...Array(days)].map((_, idx) => {
    const newDate = new Date(startDate.getDate());
    newDate.setDate(newDate.getDate() + idx);
    return parseString(newDate);
  });

  const ganttChartBar = createGanttChartBar(project, tasks, cellStyle);

  const handleBarClick = (
    e: React.MouseEvent<HTMLElement>,
    task_id: string
  ) => {
    const selectedTask = tasks.find((task) => task.task_id === task_id);

    if (selectedTask) {
      dispatch(setEditedTask(selectedTask));
      dispatch(setTaskDialogMode('detail'));
      dispatch(setTaskDialogOpen(true));
    }
  };

  return (
    <>
      <table css={styles.table}>
        <tr>
          <th css={styles.taskName}>
            <Typography component='div' noWrap>
              タスク名
            </Typography>
          </th>
          {dates.map((date) => (
            <th>
              <Typography>{date}</Typography>
            </th>
          ))}
        </tr>
        {tasks.map((task) => {
          return (
            <tr>
              <td css={styles.taskName}>
                <Typography component='div' noWrap align='left'>
                  {task.task_name}
                </Typography>
              </td>
              {[...Array(days)].map(() => (
                <td></td>
              ))}
            </tr>
          );
        })}
      </table>
      {ganttChartBar.map((bar) => (
        <div
          css={css`
            top: ${bar.top};
            left: ${bar.left};
            width: ${bar.width};
            cursor: pointer;
          `}
          onClick={(e) => handleBarClick(e, bar.task_id)}
        >
          <Box
            component='div'
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              typography: 'body1',
            }}
          >
            {bar.task_name}
          </Box>
        </div>
      ))}
    </>
  );
};

export default GanttChart;
