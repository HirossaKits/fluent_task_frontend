import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Typography from "@material-ui/core/Typography";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as dateHandler from "../../date/dateHandler";
import { selectCalendar, setCalendar } from "./calendarSlice";
import { selectTasks } from "../task/taskSlice";
import { fillDigitsByZero } from "../../date/dateHandler";

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
    selector: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    dropdownStyle: {
      maxHeight: 300,
    },
    gridWrap: {
      height: "450",
    },
    gridList: {
      width: "84%",
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
      "& .plus": {
        color: "rgba(0,0,0,0)",
      },
      "&:hover": {
        "& .plus": {
          color: "inherit",
          transition: "0.8s",
        },
      },
      cursor: "pointer",
      backgournd: "blue",
    },
    textdate: {
      marginLeft: 10,
    },
    texttoday: {
      marginLeft: 5,
      padding: "0px 7px",
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
    addIcon: {
      height: 10,
      fontSize: "small",
      color: "action",
    },
  };
});

const createDates = (year: number, month: number): DATE_CONTEXT[] => {
  let dates: DATE_CONTEXT[] = [];
  let day = dateHandler.getFirstDateOfMonth(year, month).getDay();

  for (let i = 0; i < 35; i++) {
    const dt = new Date(year, month - 1, i - day + 1);
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
      dispatch(
        setCalendar({
          year: calendar.year + 1,
          month: 1,
          year_month: `${calendar.year + 1}-01`,
        })
      );
    } else {
      dispatch(
        setCalendar({
          year: calendar.year,
          month: calendar.month + 1,
          year_month: `${calendar.year}-${fillDigitsByZero(
            calendar.month + 1,
            2
          )}`,
        })
      );
    }
  };

  const decrementMonth = () => {
    if (calendar.month === 1) {
      dispatch(
        setCalendar({
          year: calendar.year - 1,
          month: 12,
          year_month: `${calendar.year - 1}-12`,
        })
      );
    } else {
      dispatch(
        setCalendar({
          year: calendar.year,
          month: calendar.month - 1,
          year_month: `${calendar.year}-${fillDigitsByZero(
            calendar.month - 1,
            2
          )}`,
        })
      );
    }
  };

  const yearMonthOptions: string[] = Array(24)
    .fill("")
    .map((_, index, array) => {
      const ym = `${
        calendar.year - ~~(array.length / 2 / 12) + ~~(index / 12)
      }-${fillDigitsByZero(((calendar.month + index) % 12) + 1, 2)}`;
      return ym;
    });

  console.log("test", yearMonthOptions);

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
      let top = row * 164 + 32 + taskObject.layer * 28;

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
      <Grid
        className={classes.gridWrap}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          className={classes.selector}
          xs={10}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Select
              name="year_month"
              value={"2020-01"}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                classes: {
                  paper: classes.dropdownStyle,
                },
              }}
            >
              {yearMonthOptions.map((yearMonth) => (
                <MenuItem>{yearMonth}</MenuItem>
              ))}
            </Select>
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
        <ImageList
          className={classes.gridList}
          rowHeight={160}
          cols={7}
          spacing={0}
        >
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
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                // onClick={handleDateHeaderClick}
              >
                <Grid>
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
                  <Typography className={"plus"}>+</Typography>
                </Grid>
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
