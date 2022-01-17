import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { selectYearMonth, setYearMonth } from './calendarSlice';
import { fillDigitsByZero } from '../../util/dateHandler';
import { useCalendarFactory } from '../../hooks/calendar';
import useProjectTask from '../../hooks/projectTask';
import { parseString } from '../../util/dateHandler';
import { selectSelectedProjectId } from '../proj/projectSlice';
import {
  initialTask,
  setEditedTask,
  setTaskDialogMode,
  setTaskDialogOpen,
} from '../task/taskSlice';
import TaskDialog from '../task/TaskDialog';

const week = ['日', '月', '火', '水', '木', '金', '土'];

export interface DATE_CONTEXT {
  index: number;
  dateStr: string;
  year: number;
  month: number;
  date: number;
  isToday: boolean;
}

const Calendar = () => {
  const theme = useTheme();

  const calendarBarStyle = {
    topPosition: 32,
    height: 22,
    span: 4,
    roundEdge: 6,
  };

  const styles = {
    test: css`
      background-color: transparent;
    `,
    header: css`
      width: 86%;
    `,
    select: css`
      margin-top: 10px;
      width: 120px;
    `,
    gridList: css`
      width: 86%;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.divider};
      position: relative;
    `,
    gridTile: css`
      border-bottom: 1px solid;
      border-right: 1px solid;
      border-color: ${theme.palette.divider};
    `,
    gridTileGray: css`
      border-bottom: 1px solid;
      border-right: 1px solid;
      border-color: ${theme.palette.divider};
      background-color: ${theme.palette.action.hover};
    `,
    headerdate: css`
      margin-top: 8px;
      margin-left: 12px;
      text-align: left;
      & .plus {
        margin-left: 12px;
        color: rgba(0, 0, 0, 0);
      }
      &:hover {
        & .plus {
          color: inherit;
          transition: 0.8s;
        }
      }
      cursor: pointer;
      backgournd: blue;
    `,
    texttoday: css`
      padding: 0px 7px;
      color: white;
      background: ${theme.palette.primary.main};
      border-radius: 15px;
    `,
    texttask: css`
      display: block;
      height: ${calendarBarStyle.height}px;
      padding-left: 10px;
      color: white;
      background: ${theme.palette.primary.main};
      position: absolute;
    `,
    addIcon: css`
      height: 10;
      fontsize: small;
      color: action;
    `,
    remarks: css`
      padding-bottom: 2px;
    `,
  };

  const dispatch = useDispatch();
  const projectId = useSelector(selectSelectedProjectId);
  const yearMonth = useSelector(selectYearMonth);
  const tasks = useProjectTask();

  const calendarFactory = useCalendarFactory();
  const [calendarDates, calendarBars] = calendarFactory(
    yearMonth,
    tasks,
    calendarBarStyle
  );

  const yearMonthOptions = (optionCount: number): string[] => {
    const options = [...Array(optionCount)].map((_, idx) => {
      let date = new Date(yearMonth.year, yearMonth.month, 1);
      date.setMonth(date.getMonth() - 1 + idx - Math.floor(optionCount / 2));
      return parseString(date).slice(0, 7);
    });
    return options;
  };

  const handleSelectChange = (event: any, newItem: string) => {
    if (!newItem) return;
    dispatch(
      setYearMonth({
        year: parseInt(newItem.slice(0, 4)),
        month: parseInt(newItem.slice(5, 7)),
        year_month: newItem,
      })
    );
  };

  const incrementMonth = () => {
    if (yearMonth.month === 12) {
      dispatch(
        setYearMonth({
          year: yearMonth.year + 1,
          month: 1,
          year_month: `${yearMonth.year + 1}-01`,
        })
      );
    } else {
      dispatch(
        setYearMonth({
          year: yearMonth.year,
          month: yearMonth.month + 1,
          year_month: `${yearMonth.year}-${fillDigitsByZero(
            yearMonth.month + 1,
            2
          )}`,
        })
      );
    }
  };

  const decrementMonth = () => {
    if (yearMonth.month === 1) {
      dispatch(
        setYearMonth({
          year: yearMonth.year - 1,
          month: 12,
          year_month: `${yearMonth.year - 1}-12`,
        })
      );
    } else {
      dispatch(
        setYearMonth({
          year: yearMonth.year,
          month: yearMonth.month - 1,
          year_month: `${yearMonth.year}-${fillDigitsByZero(
            yearMonth.month - 1,
            2
          )}`,
        })
      );
    }
  };

  const handleDateClick = (
    e: React.MouseEvent<HTMLElement>,
    dateStr: string
  ) => {
    dispatch(
      setEditedTask({
        ...initialTask,
        project_id: projectId,
        scheduled_startdate: dateStr,
      })
    );
    dispatch(setTaskDialogMode('register'));
    dispatch(setTaskDialogOpen(true));
  };

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
      <Grid
        xs={12}
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        css={styles.test}
      >
        <Grid
          css={styles.header}
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Autocomplete
              css={styles.select}
              disableClearable
              options={yearMonthOptions(13)}
              value={yearMonth.year_month}
              onChange={(event, newItem) => handleSelectChange(event, newItem)}
              renderInput={(params) => (
                <TextField {...params} variant='standard' />
              )}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={decrementMonth}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={incrementMonth}>
              <NavigateNextIcon />
            </IconButton>
          </Grid>
        </Grid>
        <ImageList css={styles.gridList} rowHeight={160} cols={7} gap={0}>
          {calendarDates.map((ctx, idx) => (
            <ImageListItem
              key={idx}
              css={
                ctx.month === yearMonth.month
                  ? styles.gridTile
                  : styles.gridTileGray
              }
            >
              <Stack height='100%' justifyContent='space-between'>
                <Grid
                  xs={10}
                  css={styles.headerdate}
                  id={ctx.dateStr}
                  item
                  container
                  direction='row'
                  justifyContent='flex-start'
                  alignItems='flex-start'
                  onClick={(e) => handleDateClick(e, ctx.dateStr)}
                >
                  <Grid item>
                    <Typography css={ctx.isToday && styles.texttoday}>
                      {ctx.date === 1
                        ? `${ctx.month}月${ctx.date}日`
                        : ctx.date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className='plus'>+</Typography>
                  </Grid>
                </Grid>
                {ctx.layer && Math.max(...ctx.layer) >= 4 && (
                  <Grid css={styles.remarks}>
                    <Typography color={theme.palette.text.disabled}>{`その他${
                      Math.max(...ctx.layer) - 3
                    }件`}</Typography>
                  </Grid>
                )}
              </Stack>
            </ImageListItem>
          ))}
          {calendarBars.map(
            (bar) =>
              bar.visible && (
                <Typography
                  css={css`
                    ${styles.texttask};
                    top: ${bar.top};
                    left: ${bar.left};
                    width: ${bar.width};
                    border-radius: ${!bar.startEdge && !bar.endEdge
                      ? '0px'
                      : bar.startEdge && !bar.endEdge
                      ? `${calendarBarStyle.roundEdge}px 0px 0px ${calendarBarStyle.roundEdge}px`
                      : !bar.startEdge && bar.endEdge
                      ? `0px ${calendarBarStyle.roundEdge}px ${calendarBarStyle.roundEdge}px 0px`
                      : `${calendarBarStyle.roundEdge}px`};
                    cursor: pointer;
                  `}
                  onClick={(e) => handleBarClick(e, bar.task_id)}
                >
                  {bar.task_name}
                </Typography>
              )
          )}
        </ImageList>
      </Grid>
      <TaskDialog />
    </>
  );
};

export default Calendar;
