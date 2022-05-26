import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { selectSelectedProject } from '../proj/projectSlice';
import { selectTasks } from '../task/taskSlice';
import { parseString, getDateSpan } from '../../util/dateHandler';

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
        height: 32px;
      }
    `,
    taskName: css`
      width: 1000px;
    `,
  };

  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const startDate = new Date(project.startdate);
  const endDate = new Date(project.enddate);

  const days = getDateSpan(endDate, startDate);

  const dates = [...Array(days)].map((_, idx) => {
    const newDate = new Date(startDate.getDate());
    newDate.setDate(newDate.getDate() + idx);
    return parseString(newDate);
  });

  return (
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
  );
};

export default GanttChart;
