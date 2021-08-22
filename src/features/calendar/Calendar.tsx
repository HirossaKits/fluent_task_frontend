import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  createRef,
  useLayoutEffect,
  useCallback,
} from "react";

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

import { makeStyles, createTheme } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// カレンダーのヘッダー用
const week = ["日", "月", "火", "水", "木", "金", "土"];

// カレンダーの年月
interface YearMonth {
  year: number;
  month: number;
}

// カレンダー内の日付オブジェクトの型
interface DateContext {
  index: number;
  dateStr: string;
  year: number;
  month: number;
  date: number;
  isToday: boolean;
}

// タスクデータの型
interface TaskData {
  id: string;
  startDate: string;
  endDate: string;
  color: string;
  title: string;
}

interface Task {
  startDate: Date;
  endDate: Date;
  dateSpan: number;
  top: string;
  left: string;
  width: string;
  layer: number;
  color: string;
  title: string;
  divided: boolean;
  startEdge: boolean;
  endEdge: boolean;
  other: boolean;
  otherCount: number;
}

// カレンダーの年月の初期値
const initialYearMonth = (): YearMonth => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  return { year: year, month: month };
};

// Material-Uiのスタイル
const useStyles = (darkMode: boolean) =>
  makeStyles((theme) => {
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
        background: darkMode
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.04)",
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

// 2桁で0埋め
const toDoubleDigits = (num: Number): String => {
  let val = num.toString() + "";
  if (val.length === 1) {
    val = "0" + val;
  }
  return val;
};

// デモデータ
const Data: TaskData[] = [
  {
    id: "-1",
    startDate: "2021-06-26",
    endDate: "2021-06-28",
    color: "",
    title: "タスク-1",
  },
  {
    id: "0",
    startDate: "2021-06-30",
    endDate: "2021-07-1",
    color: "",
    title: "タスク0",
  },
  {
    id: "1",
    startDate: "2021-07-17",
    endDate: "2021-07-18",
    color: "#00796b",
    title: "タスク1",
  },
  {
    id: "2",
    startDate: "2021-07-18",
    endDate: "2021-07-19",
    color: "#388e3c",
    title: "タスク2",
  },
  {
    id: "3",
    startDate: "2021-07-18",
    endDate: "2021-07-20",
    color: "#afb42b",
    title: "タスク3",
  },
  {
    id: "4",
    startDate: "2021-07-30",
    endDate: "2021-08-16",
    color: "",
    title: "タスク4",
  },
];

const Calendar = () => {
  // ダークモード
  const [darkMode, setDarkMode] = useState(false);
  // 年月
  const [yearMonth, setYearMonth] = useState(initialYearMonth);
  // TextFieldの値
  const [ymText, setYmText] = useState(
    `${yearMonth.year}${toDoubleDigits(yearMonth.month)}`
  );
  // TexFieldのエラーメッセージ
  const [ymError, setymError] = useState(" ");
  // ダイアログのオープン
  const [openDialog, setOpenDialog] = useState(false);
  // ダイアログの入力
  const [dialogInput, setDialogInput] = useState<TaskData>({
    id: "",
    title: "",
    startDate: "",
    endDate: "",
    color: "",
  });
  const [taskData, setTaskData] = useState(Data);

  // 年月更新時
  useEffect(() => {
    setYmText(`${yearMonth.year}${toDoubleDigits(yearMonth.month)}`);
  }, [yearMonth]);

  // Themeの設定
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        type: darkMode ? "dark" : "light",
      },
    });
  }, [darkMode]);

  // Styleの設定
  let classes = useStyles(darkMode)();

  //
  const handleSwitchChanged = () => {
    setDarkMode(!darkMode);
  };

  // Button押下時
  const incrementMonth = () => {
    if (yearMonth.month === 12) {
      setYearMonth({ year: yearMonth.year + 1, month: 1 });
    } else {
      setYearMonth({ year: yearMonth.year, month: yearMonth.month + 1 });
    }
  };

  const decrementMonth = () => {
    if (yearMonth.month === 1) {
      setYearMonth({ year: yearMonth.year - 1, month: 12 });
    } else {
      setYearMonth({ year: yearMonth.year, month: yearMonth.month - 1 });
    }
  };

  const handleDateHeaderClick = () => {
    setOpenDialog(!openDialog);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogInputChange = (e: any) => {
    setDialogInput({ ...dialogInput, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = () => {
    setTaskData([...taskData, dialogInput]);
    setOpenDialog(false);
  };
  // Visible Plus
  // const handleMouseEnter = (e: any) => {
  //   e.bubbles = true;
  //   console.log(e.target.id);
  //   let elem = document.getElementById(`plus_${e.target.id}`);
  //   console.log(elem);
  //   if (elem) {
  //     elem.style.backgroundColor = "#FFFFFF";
  //   }
  // };

  // カレンダー内の日付オブジェクト生成
  const calendarObject = (): DateContext[] => {
    let day = new Date(yearMonth.year, yearMonth.month - 1, 1).getDay();

    let dateInMonth: DateContext[] = [];
    let t = new Date();
    let ty = t.getFullYear();
    let tm = t.getMonth() + 1;
    let td = t.getDate();

    for (let i = 0; i < 35; i++) {
      let dt = new Date(yearMonth.year, yearMonth.month - 1, i - day + 1);
      let y = dt.getFullYear();
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      let dc: DateContext = {
        index: i,
        dateStr: `${y}-${toDoubleDigits(m)}-${toDoubleDigits(d)}`,
        year: y,
        month: m,
        date: d,
        isToday: ty === y && tm === m && td === d,
      };
      dateInMonth.push(dc);
    }

    return dateInMonth;
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

    const tasks: Task[] = taskData.map((data, index) => {
      // startDate
      let startDate = new Date(data.startDate + " 00:00:00");
      // endDate
      let endDate = new Date(data.endDate + " 00:00:00");
      // layer
      let layer = incrementlayer(startDate, endDate);

      return {
        id: data.id,
        startDate: startDate,
        endDate: endDate,
        dateSpan: 0,
        top: "",
        left: "",
        width: "",
        layer: layer,
        color: data.color,
        title: data.title,
        divided: false,
        startEdge: true,
        endEdge: true,
        other: false,
        otherCount: 0,
      };
    });

    // タスクの分割
    let dividedTasks: Task[] = [];

    for (let tIdx = 0; tIdx < tasks.length; tIdx++) {
      let firstDay = new Date(yearMonth.year, yearMonth.month - 1, 1).getDay();
      let firstDate = new Date(
        yearMonth.year,
        yearMonth.month - 1,
        1 - firstDay
      );
      let lastDate = new Date(
        yearMonth.year,
        yearMonth.month - 1,
        35 - firstDay
      );

      // カレンダーに含まれないものはカット
      if (
        tasks[tIdx].endDate.getTime() < firstDate.getTime() ||
        lastDate.getTime() < tasks[tIdx].startDate.getTime()
      ) {
        continue;
      }

      // カレンダーからオーバーフローするものはカット
      if (tasks[tIdx].startDate.getTime() < firstDate.getTime()) {
        tasks[tIdx].startDate = firstDate;
        tasks[tIdx].startEdge = false;
      }
      if (lastDate.getTime() < tasks[tIdx].endDate.getTime()) {
        tasks[tIdx].endDate = lastDate;
        tasks[tIdx].endEdge = false;
      }

      // 期間を設定
      tasks[tIdx].dateSpan =
        (tasks[tIdx].endDate.valueOf() - tasks[tIdx].startDate.valueOf()) /
          86400000 +
        1;

      // その他タスクを設定
      let otherTasks: Task[] = [];
      if (tasks[tIdx].layer >= 5) {
        for (let i = 0; i < tasks[tIdx].dateSpan; i++) {}
      }

      let dayStart = tasks[tIdx].startDate.getDay();
      let divCount = Math.ceil((dayStart + tasks[tIdx].dateSpan) / 7);

      if (divCount === 1) {
        dividedTasks.push(tasks[tIdx]);
      } else {
        for (let dIdx = 0; dIdx < divCount; dIdx++) {
          if (dIdx === 0) {
            let newEndDate = new Date(tasks[tIdx].startDate.getTime());
            newEndDate.setDate(tasks[tIdx].startDate.getDate() + 6 - dayStart);
            dividedTasks.push({
              ...tasks[tIdx],
              endDate: newEndDate,
              endEdge: false,
            });
          } else if (dIdx !== divCount - 1) {
            let newStartDate = new Date(tasks[tIdx].startDate.getTime());
            let newEndDate = new Date(tasks[tIdx].endDate.getTime());
            newStartDate.setDate(
              tasks[tIdx].startDate.getDate() + 7 * dIdx - dayStart
            );

            newEndDate.setDate(newStartDate.getDate() + 6 * dIdx - dayStart);

            dividedTasks.push({
              ...tasks[tIdx],
              startDate: newStartDate,
              endDate: newEndDate,
              startEdge: false,
              endEdge: false,
            });
          } else if (dIdx === divCount - 1) {
            let newStartDate = new Date(tasks[tIdx].startDate.getTime());
            newStartDate.setDate(
              tasks[tIdx].startDate.getDate() + 7 * dIdx - dayStart
            );

            dividedTasks.push({
              ...tasks[tIdx],
              startDate: newStartDate,
              startEdge: false,
            });
          }
        }
      }
    }

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
      if (month < yearMonth.month) {
        row = 0;
      } else if (month > yearMonth.month) {
        row = 4;
      } else {
        row = Math.ceil(
          (new Date(yearMonth.year, yearMonth.month - 1, 1).getDay() +
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

  // Get Rect
  // let rect = document
  // .getElementById(task.startDate)
  // ?.getBoundingClientRect();

  // Ref Demo1
  //   const elRef: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> =
  //   useRef([]);
  // for (let i = 0; i < 35; i++) {
  //   elRef.current[i] = createRef<HTMLDivElement>();
  // }

  // Ref Demo2
  // interface dateRef {
  //   [index: string]: React.RefObject<HTMLDivElement>;
  // }
  // const elRef: React.MutableRefObject<dateRef> = useRef({});

  // calendarObject().map((dateCon: DateContext) => {
  //   elRef.current[dateCon.dateStr] = createRef<HTMLDivElement>();
  // });

  // Windowサイズ
  const [size, setSize] = useState(null);

  // Windowリサイズ検知
  const objectRef: React.RefObject<HTMLObjectElement> = useRef(null);

  const _onResize = useCallback((e: Event) => {
    console.log("woooooo");
    console.log(e);
  }, []);

  const onLoad = () => {
    console.log("Hey");
  };

  // const onLoad = useCallback(() => {
  //   console.log("oooooo");
  //   const obj = objectRef.current;
  //   console.log("onload!");
  //   if (obj && obj.contentDocument && obj.contentDocument.defaultView) {
  //     obj.contentDocument.defaultView.addEventListener("resize", _onResize);
  //   }
  // }, []);

  // クリーンアップ処理
  // useEffect(() => {
  //   return () => {
  //     const obj = objectRef.current;
  //     if (obj && obj.contentDocument && obj.contentDocument.defaultView) {
  //       obj.contentDocument.defaultView.removeEventListener(
  //         "resize",
  //         _onResize
  //       );
  //     }
  //   };
  // }, []);
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
                dateCon.month === yearMonth.month
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

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            xs={10}
          >
            <Grid item xs={12}>
              <TextField
                name='title'
                label='タスク名'
                size='small'
                fullWidth
                onChange={handleDialogInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='startDate'
                label='開始日'
                size='small'
                onChange={handleDialogInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='endDate'
                label='終了日'
                size='small'
                onChange={handleDialogInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterClick} color='primary'>
            登録
          </Button>
          <Button onClick={handleDialogClose} color='primary'>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Calendar;
