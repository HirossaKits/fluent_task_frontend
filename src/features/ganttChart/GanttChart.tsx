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
import { GANTTCHART_TABLE_STYLE, GANTTCHART_BAR_STYLE } from '../types';

const tableStyle: GANTTCHART_TABLE_STYLE = {
  headerColumnWidth: 300,
  cellWidth: 32,
  cellHeight: 32,
};

const barStyle: GANTTCHART_BAR_STYLE = {
  topPosition: 32,
  height: 12,
  span: 4,
  roundEdge: 4,
};

const GanttChart = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const createGanttChartBar = useCreateGanttChartBar();

  const startDate = new Date(project.startdate);
  const endDate = new Date(project.enddate);

  const days = getDateSpan(endDate, startDate);

  const dates = [...Array(days)].map((_, idx) => {
    const newDate = new Date(startDate.getTime());
    newDate.setDate(newDate.getDate() + idx);
    return newDate;
  });

  const ganttChartBar = createGanttChartBar(
    project,
    tasks,
    tableStyle,
    barStyle
  );

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

  const styles = {
    wrapper: css`
      position: relative;
      overflow: auto;
    `,
    table: css`
      width: ${tableStyle.headerColumnWidth + tableStyle.cellWidth * days}px;
      table-layout: fixed;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.action.hover};
      border-collapse: collapse;
      th {
        border-right: 1px solid;
        border-bottom: 1px solid;
        border-color: ${theme.palette.action.hover};
        height: ${tableStyle.cellHeight}px;
      }
      td {
        border-right: 1px solid;
        border-bottom: 1px solid;
        border-color: ${theme.palette.action.hover};
        height: ${tableStyle.cellHeight}px;
      }
    `,
    tableColumn: css`
      width: ${tableStyle.cellWidth}px;
    `,
    tableHeaderColumn: css`
      width: ${tableStyle.headerColumnWidth}px;
    `,
    schedulesBar: css`
      white-space: nowrap;
      display: block;
      height: ${barStyle.height}px;
      padding: 0 10px;
      background: ${theme.palette.primary.main};
      position: absolute;
    `,
    actualBar: css`
      white-space: nowrap;
      display: block;
      height: ${barStyle.height}px;
      padding: 0 10px;
      background: ${theme.palette.divider};
      position: absolute;
    `,
  };

  return (
    <>
      <div css={styles.wrapper}>
        <table css={styles.table}>
          <tr>
            <th css={styles.tableHeaderColumn}>
              <Typography component='div' noWrap>
                タスク名
              </Typography>
            </th>
            {dates.map((date) => (
              <th css={styles.tableColumn}>
                <Typography>{date.getDate()}</Typography>
              </th>
            ))}
          </tr>
          {tasks.map((task) => {
            return (
              <tr>
                <td css={styles.tableHeaderColumn}>
                  <Typography component='div' noWrap align='left'>
                    {task.task_name}
                  </Typography>
                </td>
                {[...Array(days)].map(() => (
                  <td css={styles.tableColumn}></td>
                ))}
              </tr>
            );
          })}
        </table>
        {ganttChartBar.scheduled.map((bar) => (
          <div
            css={css`
              ${styles.schedulesBar};
              top: ${bar.top}px;
              left: ${bar.left}px;
              width: ${bar.width}px;
              border-radius: ${!bar.startEdge && !bar.endEdge
                ? '0px'
                : bar.startEdge && !bar.endEdge
                ? `${barStyle.roundEdge}px 0px 0px ${barStyle.roundEdge}px`
                : !bar.startEdge && bar.endEdge
                ? `0px ${barStyle.roundEdge}px ${barStyle.roundEdge}px 0px`
                : `${barStyle.roundEdge}px`};
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
            ></Box>
          </div>
        ))}
        {ganttChartBar.actual.map((bar) => (
          <div
            css={css`
              ${styles.actualBar};
              top: ${bar.top}px;
              left: ${bar.left}px;
              width: ${bar.width}px;
              border-radius: ${!bar.startEdge && !bar.endEdge
                ? '0px'
                : bar.startEdge && !bar.endEdge
                ? `${barStyle.roundEdge}px 0px 0px ${barStyle.roundEdge}px`
                : !bar.startEdge && bar.endEdge
                ? `0px ${barStyle.roundEdge}px ${barStyle.roundEdge}px 0px`
                : `${barStyle.roundEdge}px`};
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
            ></Box>
          </div>
        ))}
      </div>
    </>
  );
};

export default GanttChart;
