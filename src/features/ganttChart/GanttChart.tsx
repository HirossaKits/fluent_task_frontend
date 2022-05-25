import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { selectSelectedProject } from '../proj/projectSlice';
import { selectTasks } from '../task/taskSlice';
import { parseString, getDateSpan } from '../../util/dateHandler';

const GanttChart = () => {
  const styles = {
    table: css`
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.divider};
    `,
    cell: css``,
  };

  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const startDate = new Date(project.startdate);
  const endDate = new Date(project.enddate);

  const days = getDateSpan(endDate, startDate);
  console.log(days);

  const dates = [...Array(days)].map((_, idx) => {
    const newDate = new Date(startDate.getDate());
    newDate.setDate(newDate.getDate() + idx);
    return parseString(newDate);
  });

  return (
    <table>
      {dates.map((date) => (
        <th>
          <Typography>{date}</Typography>
        </th>
      ))}
      <tr>
        <td></td>
      </tr>
    </table>
  );
};

export default GanttChart;
