import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  fillDigitsByZero,
  parseDate,
  getFirstDateOfCalendar,
  getLastDateOfCalendar,
} from "../../date/dateHandler";
import { selectCalendar, setCalendar } from "./calendarSlice";
import { selectTasks } from "../task/taskSlice";

const week = ["日", "月", "火", "水", "木", "金", "土"];

// タスクデータの型
interface TaskData {
  id: string;
  startDate: string;
  endDate: string;
  color: string;
  title: string;
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

const useStyles = makeStyles((theme: Theme) => {
  return {
    grid: {
      width: "80%",
      borderTop: `1px solid`,
      borderLeft: `1px solid`,
      position: "relative",
    },
    tile: {
      width: "1/7",
      borderBottom: `1px solid`,
      borderRight: `1px solid`,
    },
    tilegray: {
      width: "1/7",
      borderBottom: `1px solid`,
      borderRight: `1px solid`,
      background: "rgba(255, 255, 255, 0.08)",
    },
    headerdate: {
      textAlign: "left",
      "&:hover .plus": {
        color: "inherit",
        transition: "0.5s",
      },
      cursor: "pointer",
    },
    textdate: {
      display: "inline",
      marginLeft: 10,
    },
    texttoday: {
      display: "inline",
      marginLeft: 10,
      padding: "5px 10px",
      color: "white",
      background: theme.palette.primary.main,
      borderRadius: "15px",
    },
    texttask: {
      display: "block",
      color: "white",
      background: theme.palette.primary.main,
      position: "absolute",
    },
  };
});

const Calendar = () => {
  const classes = useStyles();
  const calendar = useSelector(selectCalendar);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  // TextFieldの値
  const [ymText, setYmText] = useState(
    `${calendar.year}${fillDigitsByZero(calendar.month, 2)}`
  );

  const [taskData, setTaskData] = useState(Data);

  // 年月更新時
  useEffect(() => {
    setYmText(`${calendar.year}${fillDigitsByZero(calendar.month, 2)}`);
  }, [calendar]);

  // Button押下時
  const incrementMonth = () => {
    if (calendar.month === 12) {
      dispatch(setCalendar({ year: calendar.year + 1, month: 1 }));
    } else {
      dispatch(setCalendar({ year: calendar.year, month: calendar.month + 1 }));
    }
  };

  const decrementMonth = () => {
    if (calendar.month === 1) {
      dispatch(setCalendar({ year: calendar.year - 1, month: 12 }));
    } else {
      dispatch(setCalendar({ year: calendar.year, month: calendar.month - 1 }));
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

  const shapeTasks = () => {
    // ソート
    taskData.sort((a, b) => {
      if (a.startDate > b.startDate) {
        return 1;
      } else {
        return -1;
      }
    });

    const incrementlayer = incrementlayerFactory();

    const taskObjects: TASK_OBJECT[] = tasks.map((task, index) => {
      // startDate
      let startDate = parseDate(task.scheduled_startdate);
      // endDate
      let endDate = parseDate(task.scheduled_enddate);
      // layer
      let layer = incrementlayer(startDate, endDate);

      return {
        task_id: task.task_id,
        task_name: task.task_name,
        startDate: parseDate(task.scheduled_startdate),
        endDate: parseDate(task.scheduled_enddate),
        dateSpan: 0,
        top: "",
        left: "",
        width: "",
        layer: layer,
        visible: true,
        divided: false,
        startEdge: true,
        endEdge: true,
        other: false,
      };
    });

    const formatTaskObject = (ts: TASK_OBJECT[]): TASK_OBJECT[] => {
      let formattedTasks: TASK_OBJECT[] = [];

      for (let tIdx = 0; tIdx < ts.length; tIdx++) {
        let firstDate = getFirstDateOfCalendar(calendar.year, calendar.month);
        let lastDate = getLastDateOfCalendar(calendar.year, calendar.month);

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

        // 期間を設定
        ts[tIdx].dateSpan =
          (ts[tIdx].endDate.valueOf() - ts[tIdx].startDate.valueOf()) /
            86400000 +
          1;

        // 非表示タスクを設定
        if (ts[tIdx].layer >= 5) {
          ts[tIdx].visible = false;
        }

        // 週を跨ぐタスクを分割
        let dayStart = ts[tIdx].startDate.getDay();
        let divCount = Math.ceil((dayStart + ts[tIdx].dateSpan) / 7);

        if (divCount === 1) {
          dividedTasks.push(ts[tIdx]);
        } else {
          for (let dIdx = 0; dIdx < divCount; dIdx++) {
            if (dIdx === 0) {
              let newEndDate = new Date(ts[tIdx].startDate.getTime());
              newEndDate.setDate(ts[tIdx].startDate.getDate() + 6 - dayStart);
              dividedTasks.push({
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

              newEndDate.setDate(newStartDate.getDate() + 6 * dIdx - dayStart);

              dividedTasks.push({
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

              dividedTasks.push({
                ...ts[tIdx],
                startDate: newStartDate,
                startEdge: false,
              });
            }
          }
        }
      }
    };

    // タスクの分割
    let dividedTasks: Task[] = [];

    // 要素の位置の指定
    let shapedTasks = dividedTasks.map((task) => {
      // span
      let span =
        (task.endDate.valueOf() - task.startDate.valueOf()) / 86400000 + 1;

      // width
      let width = Math.trunc((1000 * span) / 7) / 10;

      // top
      let row: number;
      let month = task.startDate.getMonth() + 1;
      if (month < calendar.month) {
        row = 0;
      } else if (month > calendar.month) {
        row = 4;
      } else {
        row = Math.ceil(
          (new Date(calendar.year, calendar.month - 1, 1).getDay() +
            task.startDate.getDate()) /
            7 -
            1
        );
      }
      let top = row * 180 + 40 + task.layer * 28;

      // left
      let left = (100 / 7) * task.startDate.getDay();

      return {
        ...task,
        width: `${width}%`,
        top: `${top}px`,
        left: `${left}%`,
      };
    });
    console.log(shapedTasks);
    return shapedTasks;
  };

  const tasks = shapeTasks();

  return (
    <>
      <IconButton onClick={decrementMonth}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={incrementMonth}>
        <ArrowForwardIosIcon />
      </IconButton>
      <Grid container xs={12}>
        <GridList className={classes.grid} cols={7} spacing={0}>
          {calendarObject().map((dateCon, i) => (
            <GridListTile
              key={dateCon.dateStr}
              className={
                dateCon.month === calendar.month
                  ? classes.tile
                  : classes.tilegray
              }
            >
              <Grid
                className={classes.headerdate}
                id={dateCon.dateStr}
                container
                direction='row'
                onClick={handleDateHeaderClick}
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
                <Grid item>
                  <Typography className='plus'>+</Typography>
                </Grid>
              </Grid>
            </GridListTile>
          ))}
          {tasks.map((task) => (
            <Typography
              className={classes.texttask}
              style={{
                top: task.top,
                left: task.left,
                width: task.width,
                height: 24,
                paddingLeft: 10,
                borderRadius:
                  !task.startEdge && !task.endEdge
                    ? "0px"
                    : task.startEdge && !task.endEdge
                    ? "4px 0px 0px 4px"
                    : !task.startEdge && task.endEdge
                    ? "0px 4px 4px 0px"
                    : "4px",
                background: task.color,
              }}
            >
              {task.title}
            </Typography>
          ))}
        </GridList>
      </Grid>
    </>
  );
};

export default Calendar;
