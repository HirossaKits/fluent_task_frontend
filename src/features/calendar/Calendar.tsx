import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as dateHandler from "../../date/dateHandler";
import { selectCalendar, setCalendar } from "./calendarSlice";
import { selectTasks } from "../task/taskSlice";

const week = ["日", "月", "火", "水", "木", "金", "土"];

export interface DATE_CONTEXT {
  index: number;
  dateStr: string;
  year: number;
  month: number;
  date: number;
  isToday: boolean;
}

interface TASK_OBJECT {
  task_name: string;
  startDate: Date;
  endDate: Date;
  dateSpan: number;
  top: string;
  left: string;
  width: string;
  layer: number;
  visible: boolean;
  divided: boolean;
  startEdge: boolean;
  endEdge: boolean;
  other: boolean;
}

const roundEdge = 10;

const useStyles = makeStyles((theme: Theme) => {
  return {
    gridWrap: {
      height: "450",
    },
    gridList: {
      width: "90%",
      // height: 400,
      borderTop: `1px solid`,
      borderLeft: `1px solid`,
      borderColor: theme.palette.divider,
      position: "relative",
    },
    gridTile: {
      width: "1/7",
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
      borderColor: theme.palette.divider,
    },
    gridTileGray: {
      width: "1/7",
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
      background: theme.palette.action.hover,
    },
    headerdate: {
      textAlign: "left",
      "&:hover .plus": {
        color: "inherit",
        transition: "0.5s",
      },
      cursor: "pointer",
      backgournd: "blue",
    },
    textdate: {
      // display: "inline",
      marginLeft: 10,
      // marginTop: 0,
      // padding: 0,
      // backgournd: "blue",
    },
    texttoday: {
      // display: "inline",
      marginLeft: 3,
      padding: "0px 7px",
      color: "white",
      background: theme.palette.primary.main,
      borderRadius: "15px",
      // backgournd: "blue",
    },
    texttask: {
      display: "block",
      color: "white",
      background: theme.palette.primary.main,
      position: "absolute",
    },
  };
});

const createDates = (year: number, month: number): DATE_CONTEXT[] => {
  let dates: DATE_CONTEXT[] = [];
  let day = dateHandler.getFirstDateOfMonth(year, month).getDay();

  console.log("today", dateHandler.getToday());

  for (let i = 0; i < 35; i++) {
    const dt = new Date(year, month - 1, i - day + 1);
    console.log("date", dt);
    const dc: DATE_CONTEXT = {
      index: i,
      dateStr: dateHandler.parseString(dt),
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      date: dt.getDate(),
      isToday: dt.valueOf() === dateHandler.getToday().valueOf(),
    };
    dates.push(dc);
  }
  return dates;
};

const Calendar = () => {
  const classes = useStyles();
  const calendar = useSelector(selectCalendar);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  // TextFieldの値
  const [ymText, setYmText] = useState(
    `${calendar.year}${dateHandler.fillDigitsByZero(calendar.month, 2)}`
  );

  // 年月更新時
  useEffect(() => {
    setYmText(
      `${calendar.year}${dateHandler.fillDigitsByZero(calendar.month, 2)}`
    );
  }, [calendar]);

  // Button押下時
  const incrementMonth = () => {
    if (calendar.month === 12) {
      dispatch(setCalendar({ year: calendar.year + 1, month: 1 }));
    } else {
      dispatch(
        setCalendar({
          year: calendar.year,
          month: calendar.month + 1,
        })
      );
    }
  };

  const decrementMonth = () => {
    if (calendar.month === 1) {
      dispatch(setCalendar({ year: calendar.year - 1, month: 12 }));
    } else {
      dispatch(
        setCalendar({
          year: calendar.year,
          month: calendar.month - 1,
        })
      );
    }
  };

  const incrementlayerFactory = () => {
    let xEndDate: Date;
    let xLayer = 0;
    const incrementlayer = (startDate: Date, endDate: Date) => {
      let layer = 0;
      if (xEndDate && startDate <= xEndDate) {
        layer = xLayer + 1;
      }
      xEndDate = endDate;
      xLayer = layer;
      return layer;
    };
    return incrementlayer;
  };

  const initTaskObjects = (): TASK_OBJECT[] => {
    const initialTaskObjects = tasks.map((taskObj, index) => {
      // startDate
      const startDate = dateHandler.parseDate(taskObj.scheduled_startdate);
      // endDate
      const endDate = dateHandler.parseDate(taskObj.scheduled_enddate);

      return {
        task_id: taskObj.task_id,
        task_name: taskObj.task_name,
        startDate: startDate,
        endDate: endDate,
        dateSpan: 0,
        top: "",
        left: "",
        width: "",
        layer: 0,
        visible: true,
        divided: false,
        startEdge: true,
        endEdge: true,
        other: false,
      };
    });

    // 開始日によってソート
    initialTaskObjects.sort((a, b) => {
      if (a.startDate.valueOf() < b.startDate.valueOf()) {
        return -1;
      } else {
        return 1;
      }
    });

    return initialTaskObjects;
  };

  const sortTaskObjects = (ts: TASK_OBJECT[]): TASK_OBJECT[] => {
    const incrementlayer = incrementlayerFactory();

    const sortedTasks = ts.map((taskObj, index) => {
      // layer
      const layer = incrementlayer(taskObj.startDate, taskObj.endDate);
      // visible
      const visible = layer < 5;
      return { ...taskObj, layer: layer, visible: visible };
    });

    return sortedTasks;
  };

  const shapeTaskObjects = (ts: TASK_OBJECT[]): TASK_OBJECT[] => {
    let shapedTasks: TASK_OBJECT[] = [];

    for (let tIdx = 0; tIdx < ts.length; tIdx++) {
      let firstDate = dateHandler.getFirstDateOfCalendar(
        calendar.year,
        calendar.month
      );
      let lastDate = dateHandler.getLastDateOfCalendar(
        calendar.year,
        calendar.month
      );

      // カレンダーに含まれないタスクを除外
      if (
        ts[tIdx].endDate.getTime() < firstDate.getTime() ||
        lastDate.getTime() < ts[tIdx].startDate.getTime()
      ) {
        continue;
      }

      // カレンダーに含まれない日付をカット
      if (ts[tIdx].startDate.getTime() < firstDate.getTime()) {
        ts[tIdx].startDate = firstDate;
        ts[tIdx].startEdge = false;
      }
      if (lastDate.getTime() < ts[tIdx].endDate.getTime()) {
        ts[tIdx].endDate = lastDate;
        ts[tIdx].endEdge = false;
      }

      // dateSpan
      ts[tIdx].dateSpan =
        (ts[tIdx].endDate.valueOf() - ts[tIdx].startDate.valueOf()) / 86400000 +
        1;

      // 週を跨ぐタスクを分割
      let dayStart = ts[tIdx].startDate.getDay();
      let divCount = Math.ceil((dayStart + ts[tIdx].dateSpan) / 7);

      if (divCount === 1) {
        shapedTasks.push(ts[tIdx]);
      } else {
        for (let dIdx = 0; dIdx < divCount; dIdx++) {
          if (dIdx === 0) {
            let newEndDate = new Date(ts[tIdx].startDate.getTime());
            newEndDate.setDate(ts[tIdx].startDate.getDate() + 6 - dayStart);
            shapedTasks.push({
              ...ts[tIdx],
              endDate: newEndDate,
              endEdge: false,
            });
          } else if (dIdx !== divCount - 1) {
            let newStartDate = new Date(ts[tIdx].startDate.getTime());
            let newEndDate = new Date(ts[tIdx].endDate.getTime());
            newStartDate.setDate(
              ts[tIdx].startDate.getDate() + 7 * dIdx - dayStart
            );

            newEndDate.setDate(newStartDate.getDate() + 6);

            shapedTasks.push({
              ...ts[tIdx],
              startDate: newStartDate,
              endDate: newEndDate,
              startEdge: false,
              endEdge: false,
            });
          } else if (dIdx === divCount - 1) {
            let newStartDate = new Date(ts[tIdx].startDate.getTime());
            newStartDate.setDate(
              ts[tIdx].startDate.getDate() + 7 * dIdx - dayStart
            );

            shapedTasks.push({
              ...ts[tIdx],
              startDate: newStartDate,
              startEdge: false,
            });
          }
        }
      }
    }
    console.log(shapedTasks);
    return shapedTasks;
  };

  const setPositionTaskObjects = (ts: TASK_OBJECT[]): TASK_OBJECT[] => {
    let positionedTaskObjects = ts.map((taskObject) => {
      // span
      let span =
        (taskObject.endDate.valueOf() - taskObject.startDate.valueOf()) /
          86400000 +
        1;

      // width
      let width = Math.trunc((1000 * span) / 7) / 10;

      // top
      let row: number;
      let month = taskObject.startDate.getMonth() + 1;
      if (month < calendar.month) {
        row = 0;
      } else if (month > calendar.month) {
        row = 4;
      } else {
        row = Math.ceil(
          (new Date(calendar.year, calendar.month - 1, 1).getDay() +
            taskObject.startDate.getDate()) /
            7 -
            1
        );
      }
      let top = row * 180 + 40 + taskObject.layer * 28;

      // left
      let left = (100 / 7) * taskObject.startDate.getDay();

      return {
        ...taskObject,
        width: `${width}%`,
        top: `${top}px`,
        left: `${left}%`,
      };
    });

    return positionedTaskObjects;
  };

  return (
    <>
      <IconButton onClick={decrementMonth}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={incrementMonth}>
        <ArrowForwardIosIcon />
      </IconButton>
      <Grid
        className={classes.gridWrap}
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <ImageList className={classes.gridList} cols={7} spacing={0}>
          {createDates(calendar.year, calendar.month).map((dateCon, i) => (
            <ImageListItem
              key={dateCon.dateStr}
              className={
                dateCon.month === calendar.month
                  ? classes.gridTile
                  : classes.gridTileGray
              }
            >
              <Grid
                className={classes.headerdate}
                id={dateCon.dateStr}
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='flex-start'
                // onClick={handleDateHeaderClick}
              >
                <Grid item>
                  <Typography
                    className={
                      dateCon.isToday ? classes.texttoday : classes.textdate
                    }
                  >
                    {dateCon.date === 1
                      ? `${dateCon.month}月${dateCon.date}日`
                      : dateCon.date}
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Typography className='plus'>+</Typography>
                </Grid> */}
              </Grid>
            </ImageListItem>
          ))}
          {setPositionTaskObjects(
            shapeTaskObjects(sortTaskObjects(initTaskObjects()))
          ).map((taskObject) => (
            <Typography
              className={classes.texttask}
              style={{
                top: taskObject.top,
                left: taskObject.left,
                width: taskObject.width,
                height: 24,
                paddingLeft: 10,
                borderRadius:
                  !taskObject.startEdge && !taskObject.endEdge
                    ? "0px"
                    : taskObject.startEdge && !taskObject.endEdge
                    ? `${roundEdge}px 0px 0px ${roundEdge}px`
                    : !taskObject.startEdge && taskObject.endEdge
                    ? `0px ${roundEdge}px ${roundEdge}px 0px`
                    : `${roundEdge}px`,
                // background: taskObject.color,
              }}
            >
              {taskObject.task_name}
            </Typography>
          ))}
        </ImageList>
      </Grid>
    </>
  );
};

export default Calendar;
