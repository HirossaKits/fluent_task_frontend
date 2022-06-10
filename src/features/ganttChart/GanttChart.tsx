import React from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { Normalize, useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useCreateGanttChartBar from '../../hooks/ganttChart';
import {
  selectSelectedProject,
  selectSelectedProjectId,
} from '../proj/projectSlice';
import {
  initialEditedTask,
  selectTasks,
  setEditedTask,
  setTaskDialogMode,
  setTaskDialogOpen,
} from '../task/taskSlice';
import { getDateSpan } from '../../util/dateHandler';
import { GANTTCHART_TABLE_STYLE, GANTTCHART_BAR_STYLE } from '../types';
import CommonAvatar from '../../components/CommonAvatar';
import TaskDialog from '../task/TaskDialog';
import CommonTooltip from '../../components/CommonTooltip';
import { parseDate } from '../../util/dateHandler';
import { selectLoginUserInfo } from '../auth/authSlice';
import { parseString } from '../../util/dateHandler';

const tableStyle: GANTTCHART_TABLE_STYLE = {
  headerColumnWidth: 220,
  cellWidth: 32,
  cellHeight: 50,
};

const barStyle: GANTTCHART_BAR_STYLE = {
  height: 16,
  roundEdge: 4,
};

const GanttChart = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const project = useSelector(selectSelectedProject);
  const tasks = useSelector(selectTasks);
  const createGanttChartBar = useCreateGanttChartBar();

  const sortedTasks = tasks
    .map((task) => ({ ...task }))
    .sort((a, b) => {
      const numA = parseDate(a.scheduled_startdate);
      const numB = parseDate(b.scheduled_startdate);

      if (numA < numB) {
        return -1;
      } else if (numA > numB) {
        return 1;
      } else {
        const endA = parseDate(a.scheduled_enddate);
        const endB = parseDate(b.scheduled_enddate);
        if (endA < endB) {
          return -1;
        } else if (endA > endB) {
          return 1;
        } else {
          return 0;
        }
      }
    });

  const startDate = new Date(project.startdate);
  const endDate = new Date(project.enddate);

  const days = getDateSpan(startDate, endDate);

  const dates =
    days >= 0
      ? [...Array(days + 1)].map((_, idx) => {
          const newDate = new Date(startDate.getTime());
          newDate.setDate(newDate.getDate() + idx);
          return newDate;
        })
      : [];

  const months: { month: number; dateCount: number }[] = dates.reduce(
    (previous: { month: number; dateCount: number }[], current: Date) => {
      if (previous.length === 0) {
        return [
          {
            month: current.getMonth() + 1,
            dateCount: 1,
          },
        ];
      }

      if (previous[previous.length - 1].month === current.getMonth() + 1) {
        previous[previous.length - 1].dateCount++;
        return previous;
      } else {
        return [
          ...previous,
          {
            month: current.getMonth() + 1,
            dateCount: 1,
            lastDate: current,
          },
        ];
      }
    },
    []
  );

  const ganttChartBar = createGanttChartBar(
    project,
    sortedTasks,
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

  const handleDateClick = (e: React.MouseEvent<HTMLElement>, date: Date) => {
    const dateStr = parseString(date);
    dispatch(
      setEditedTask({
        ...initialEditedTask,
        project_id: selectedProjectId,
        author_id: loginUserInfo.user_id,
        scheduled_startdate: dateStr,
        scheduled_enddate: dateStr,
      })
    );
    dispatch(setTaskDialogMode('register'));
    dispatch(setTaskDialogOpen(true));
  };

  const styles = {
    guide: css`
      width: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 28px;
      margin-left: ${tableStyle.headerColumnWidth}px;
      margin-bottom: 20px;
    `,
    guideScheduled: css`
      display: block;
      width: ${tableStyle.cellWidth}px;
      height: ${barStyle.height}px;
      border: solid 2px ${theme.palette.primary.main};
      background: repeating-linear-gradient(
        45deg,
        ${theme.palette.primary.main},
        ${theme.palette.primary.main} 2px,
        ${theme.palette.background.default} 0,
        ${theme.palette.background.default} 6px
      );
      border-radius: ${barStyle.roundEdge}px;
    `,
    guideActual: css`
      display: block;
      width: ${tableStyle.cellWidth}px;
      height: ${barStyle.height}px;
      background-color: ${theme.palette.primary.main};
      border-radius: ${barStyle.roundEdge}px;
    `,
    wrapper: css`
      position: relative;
      overflow: auto;
    `,
    table: css`
      width: ${tableStyle.headerColumnWidth +
      tableStyle.cellWidth * (days + 1)}px;
      table-layout: fixed;
      border-right: 1px solid;
      border-bottom: 1px solid;
      border-color: ${theme.palette.action.hover};
      border-collapse: collapse;
      td {
        border-top: 1px solid;
        border-left: 1px solid;
        border-color: ${theme.palette.action.hover};
        height: ${tableStyle.cellHeight}px;
      }
    `,
    tableTopLeftHeader: css`
      border-color: black;
      background-color: transparent;
      height: ${tableStyle.cellHeight}px;
    `,
    tableHeader: css`
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.action.hover};
      height: ${tableStyle.cellHeight}px;
    `,
    tableHeaderDate: css`
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.action.hover};
      cursor: pointer;
      &:hover {
        background-color: ${theme.palette.action.hover};
        transition: 0.75s;
      }
    `,
    tableHeaderHoliday: css`
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.action.hover};
      background-color: ${theme.palette.primary.light}1A;
      cursor: pointer;
      &:hover {
        background-color: ${theme.palette.action.hover};
        transition: 0.75s;
      }
    `,
    tableTaskNameColumn: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 12px;
      padding-right: 8px;
    `,
    taskName: css`
      width: ${tableStyle.headerColumnWidth - tableStyle.cellHeight - 20}px;
    `,
    holiday: css`
      background-color: ${theme.palette.primary.light}1A;
    `,
    avatar: css`
      margin-left: 6px;
    `,
    scheduledBar: css`
      white-space: nowrap;
      display: block;
      height: ${barStyle.height}px;
      border: solid 2px ${theme.palette.primary.main};
      background: repeating-linear-gradient(
        45deg,
        ${theme.palette.primary.main},
        ${theme.palette.primary.main} 2px,
        ${theme.palette.background.default} 0,
        ${theme.palette.background.default} 6px
      );
      position: absolute;
    `,
    actualBar: css`
      white-space: nowrap;
      display: block;
      height: ${barStyle.height}px;
      background-color: ${theme.palette.primary.main};
      position: absolute;
    `,
  };

  return (
    <>
      <div css={styles.guide}>
        <div css={styles.guideScheduled}></div>
        <Typography>{t('ganttChart.scheduled')}</Typography>
        <div css={styles.guideActual}></div>
        <Typography>{t('ganttChart.actual')}</Typography>
      </div>
      <div css={styles.wrapper}>
        <table css={styles.table}>
          <colgroup>
            <col width={`${tableStyle.headerColumnWidth}px`} />
            {days >= 0 &&
              [...Array(days + 1)].map(() => (
                <col width={`${tableStyle.cellWidth}px`} />
              ))}
          </colgroup>
          <tr>
            <th css={styles.tableTopLeftHeader}></th>
            {months.map((month) => (
              <th css={styles.tableHeader} colSpan={month.dateCount}>
                <Typography variant="body2">
                  {t(
                    `ganttChart.${month.month}` as Normalize<{
                      ganttChart: {
                        '1': string;
                        '2': string;
                        '3': string;
                        '4': string;
                        '5': string;
                        '6': string;
                        '7': string;
                        '8': string;
                        '9': string;
                        '10': string;
                        '11': string;
                        '12': string;
                      };
                    }>
                  )}
                </Typography>
              </th>
            ))}
          </tr>
          <tr>
            <th css={styles.tableHeader}>
              <Typography component="div" variant="body2" noWrap>
                {t('ganttChart.taskName')}
              </Typography>
            </th>
            {dates.length > 0 &&
              dates.map((date) => {
                const day = date.getDay();
                if (day === 0 || day === 6) {
                  return (
                    <th
                      css={styles.tableHeaderHoliday}
                      onClick={(e) => handleDateClick(e, date)}
                    >
                      <Typography variant="body2">{date.getDate()}</Typography>
                    </th>
                  );
                } else {
                  return (
                    <th
                      css={styles.tableHeaderDate}
                      onClick={(e) => handleDateClick(e, date)}
                    >
                      <Typography variant="body2">{date.getDate()}</Typography>
                    </th>
                  );
                }
              })}
          </tr>
          {sortedTasks.map((task) => {
            return (
              <tr>
                <td css={styles.tableTaskNameColumn}>
                  <div css={styles.taskName}>
                    <Typography
                      component="div"
                      variant="body2"
                      noWrap
                      align="left"
                    >
                      {task.task_name}
                    </Typography>
                  </div>

                  <CommonTooltip
                    title={`${t('kanban.assigned')} : ${
                      task.assigned_name !== ' '
                        ? task.assigned_name
                        : t('user.unknownUser')
                    }`}
                  >
                    <div css={styles.avatar}>
                      <CommonAvatar
                        userId={task.assigned_id}
                        width={`${tableStyle.cellHeight - 10}px`}
                      />
                    </div>
                  </CommonTooltip>
                </td>
                {dates.length ? (
                  dates.map((date) => {
                    const day = date.getDay();
                    if (day === 0 || day === 6) {
                      return <td css={styles.holiday}></td>;
                    } else {
                      return <td></td>;
                    }
                  })
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </table>
        {ganttChartBar.scheduled.map((bar) => (
          <div
            css={css`
              ${styles.scheduledBar};
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
              component="div"
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
              component="div"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                typography: 'body1',
              }}
            ></Box>
          </div>
        ))}
      </div>
      <TaskDialog />
    </>
  );
};

export default GanttChart;
