import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { Normalize, useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { parseString, fillDigitsByZero } from '../../util/dateHandler';
import { useCalendarFactory } from '../../hooks/calendar';
import { selectLoginUserInfo } from '../auth/authSlice';
import { selectSelectedProjectId } from '../proj/projectSlice';
import {
  initialEditedTask,
  selectTasks,
  setEditedTask,
  setTaskDialogMode,
  setTaskDialogOpen,
} from '../task/taskSlice';
import { selectYearMonth, setYearMonth } from './calendarSlice';
import TaskDialog from '../task/TaskDialog';

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
    wrap: css`
      display: flex;
      flex-wrap: wrap;
    `,
    header: css`
      width: 86%;
    `,
    select: css`
      margin-top: 10px;
      width: 120px;
    `,
    week: css`
      width: 86%;
      position: relative;
      margin-top: 15px;
      margin-bottom: 5px;
    `,
    weekItem: css`
      text-align: left;
      padding-left: 10px;
    `,
    gridList: css`
      width: 86%;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: ${theme.palette.divider};
      position: relative;
      margin-top: 0;
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
    dateNone: css`
      margin-top: 8px;
      margin-left: 12px;
      text-align: left;
      & .plus {
        margin-left: 12px;
        color: rgba(0, 0, 0, 0);
      }
    `,
    date: css`
      margin-top: 8px;
      margin-left: 12px;
      text-align: left;
      & .plus {
        margin-top: -3px;
        font-size: 15px;
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
    `,
    texttoday: css`
      padding: 0px 7px;
      color: white;
      background: ${theme.palette.primary.main};
      border-radius: 15px;
    `,
    texttask: css`
      white-space: nowrap;
      display: block;
      height: ${calendarBarStyle.height}px;
      padding: 0 10px;
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
      padding-bottom: 3px;
    `,
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginUserInfo = useSelector(selectLoginUserInfo);
  const selectedProjectId = useSelector(selectSelectedProjectId);
  const tasks = useSelector(selectTasks);
  const yearMonth = useSelector(selectYearMonth);

  const calendarFactory = useCalendarFactory();
  const [calendarDates, calendarBars] = calendarFactory(
    yearMonth,
    tasks,
    calendarBarStyle
  );

  const week = [
    t('calendar.sun'),
    t('calendar.mon'),
    t('calendar.the'),
    t('calendar.wed'),
    t('calendar.thu'),
    t('calendar.fri'),
    t('calendar.sat'),
  ];

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
    <div css={styles.wrap}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          css={styles.header}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Autocomplete
              css={styles.select}
              disableClearable
              options={yearMonthOptions(13)}
              value={yearMonth.year_month}
              onChange={(event, newItem) => handleSelectChange(event, newItem)}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
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
        <ImageList css={styles.week} rowHeight={21} cols={7} gap={0}>
          {week.map((w, idx) => (
            <ImageListItem css={styles.weekItem} key={idx}>
              <Typography>{w}</Typography>
            </ImageListItem>
          ))}
        </ImageList>
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
              <Stack height="100%" justifyContent="space-between">
                <Grid
                  item
                  xs={10}
                  css={
                    selectedProjectId === 'new_project'
                      ? styles.dateNone
                      : styles.date
                  }
                  id={ctx.dateStr}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  onClick={(e) => handleDateClick(e, ctx.dateStr)}
                >
                  <Grid item>
                    <Typography css={ctx.isToday && styles.texttoday}>
                      {ctx.date === 1
                        ? t(
                            ('calendar.' + String(ctx.month)) as Normalize<{
                              calendar: {
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
                          )
                        : ctx.date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className="plus">+</Typography>
                  </Grid>
                </Grid>
                {ctx.layer && Math.max(...ctx.layer) >= 4 && (
                  <Grid css={styles.remarks}>
                    <Typography
                      variant="body2"
                      color={theme.palette.text.disabled}
                    >{`その他${Math.max(...ctx.layer) - 3}件`}</Typography>
                  </Grid>
                )}
              </Stack>
            </ImageListItem>
          ))}
          {calendarBars.map(
            (bar) =>
              bar.visible && (
                <div
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
                  <Box
                    component="div"
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      typography: 'body1',
                    }}
                  >
                    {bar.task_name}
                  </Box>
                </div>
              )
          )}
        </ImageList>
      </Grid>
      <TaskDialog />
    </div>
  );
};

export default Calendar;
