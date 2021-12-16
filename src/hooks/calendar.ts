import { useCallback } from "react"
import { TASK, CALENDAR_BAR, CALENDAR_YEAR_MONTH, CALENDAR_DATE } from "../features/types";
import * as dateHandler from '../date/dateHandler';
import { isYearAndMonthViews } from "@mui/lab/DatePicker/shared";
import { Bar } from "react-chartjs-2";

export const useCalendarBar = () => {
  return useCallback((yearMonth: CALENDAR_YEAR_MONTH, tasks: TASK[]) => {

    // Create calendar date 
    const createCalendarDates = (year: number, month: number): CALENDAR_DATE[] => {
      let dates: CALENDAR_DATE[] = [];
      let day = dateHandler.getFirstDateOfMonth(year, month).getDay();

      for (let i = 0; i < 35; i++) {
        const dt = new Date(year, month - 1, i - day + 1);
        const dc: CALENDAR_DATE = {
          index: i,
          dateStr: dateHandler.parseString(dt),
          year: dt.getFullYear(),
          month: dt.getMonth() + 1,
          date: dt.getDate(),
          isToday: dt.valueOf() === dateHandler.getToday().valueOf(),
          layer: 0
        };
        dates.push(dc);
      }
      return dates;
    };

    const calendarDates = createCalendarDates(yearMonth.year, yearMonth.month);

    // Create calendar bar 
    const calendarBars: CALENDAR_BAR[] = tasks.map((task) => {

      const startDate = dateHandler.parseDate(task.scheduled_startdate);
      const endDate = dateHandler.parseDate(task.scheduled_enddate);
      const dateSpan = (endDate.valueOf() - startDate.valueOf()) / 86400000 + 1

      return {
        task_id: task.task_id,
        task_name: task.task_name,
        startDate: startDate,
        endDate: endDate,
        dateSpan: dateSpan,
        top: '',
        left: '',
        width: '',
        layer: 0,
        visible: true,
        divided: false,
        startEdge: true,
        endEdge: true,
        other: false,
      };
    });

    // Sort calendar by startDate
    calendarBars.sort((a, b) => {

      const numA = a.startDate.valueOf()
      const numB = b.startDate.valueOf()

      if (numA < numB) {
        return -1;
      } else if (numA > numB) {
        return 1;
      } else {
        if (a.dateSpan < b.dateSpan) {
          return 1
        } else if (a.dateSpan > b.dateSpan) {
          return -1
        } else {
          return 0
        }
      }
    });

    // Set layer on calendar date and calendar bar
    const layeredCalendarBars: CALENDAR_BAR[] = calendarBars.map((bar, idx) => {

      let layer = 0;
      const exBar = calendarBars[idx - 1]

      for (let i = 0; i <= exBar.layer; i++) {
        layer = i
        const comparisonBar = calendarBars[idx - exBar.layer - 1 + i]
        if (comparisonBar.endDate < bar.startDate) {
          break
        }
      }

      // set layer on calendar date
      const startDateStr = dateHandler.parseString(bar.startDate)
      const startIndex = calendarDates.find((date) => date.dateStr === startDateStr)?.index
      for (let i = 0; i < bar.dateSpan; i++) {
        startIndex && calendarDates[startIndex + i].layer = layer;
      }

      // Set layer on calendar bar
      const visible = layer < 5;
      return { ...bar, layer: layer, visible: visible };
    });

    const shapeCalendarBars = (bars: CALENDAR_BAR[]): CALENDAR_BAR[] => {

      let shapedTasks: CALENDAR_BAR[] = [];

      for (let i = 0; i < bars.length; i++) {
        let firstDate = dateHandler.getFirstDateOfCalendar(
          yearMonth.year,
          yearMonth.month
        );
        let lastDate = dateHandler.getLastDateOfCalendar(
          yearMonth.year,
          yearMonth.month
        );

        // カレンダーに含まれないタスクを除外
        if (
          bars[i].endDate.getTime() < firstDate.getTime() ||
          lastDate.getTime() < bars[i].startDate.getTime()
        ) {
          continue;
        }

        // カレンダーに含まれない日付をカット
        if (bars[i].startDate.getTime() < firstDate.getTime()) {
          bars[i].startDate = firstDate;
          bars[i].startEdge = false;
        }
        if (lastDate.getTime() < bars[i].endDate.getTime()) {
          bars[i].endDate = lastDate;
          bars[i].endEdge = false;
        }

        // dateSpan
        bars[i].dateSpan =
          (bars[i].endDate.valueOf() - bars[i].startDate.valueOf()) / 86400000 +
          1;

        // 週を跨ぐタスクを分割
        let dayStart = bars[i].startDate.getDay();
        let divCount = Math.ceil((dayStart + bars[i].dateSpan) / 7);

        if (divCount === 1) {
          shapedTasks.push(bars[i]);
        } else {
          for (let dIdx = 0; dIdx < divCount; dIdx++) {
            if (dIdx === 0) {
              let newEndDate = new Date(bars[i].startDate.getTime());
              newEndDate.setDate(bars[i].startDate.getDate() + 6 - dayStart);
              shapedTasks.push({
                ...bars[i],
                endDate: newEndDate,
                endEdge: false,
              });
            } else if (dIdx !== divCount - 1) {
              let newStartDate = new Date(bars[i].startDate.getTime());
              let newEndDate = new Date(bars[i].endDate.getTime());
              newStartDate.setDate(
                bars[i].startDate.getDate() + 7 * dIdx - dayStart
              );

              newEndDate.setDate(newStartDate.getDate() + 6);

              shapedTasks.push({
                ...bars[i],
                startDate: newStartDate,
                endDate: newEndDate,
                startEdge: false,
                endEdge: false,
              });
            } else if (dIdx === divCount - 1) {
              let newStartDate = new Date(bars[i].startDate.getTime());
              newStartDate.setDate(
                bars[i].startDate.getDate() + 7 * dIdx - dayStart
              );

              shapedTasks.push({
                ...bars[i],
                startDate: newStartDate,
                startEdge: false,
              });
            }
          }
        }
      }
      return shapedTasks;
    };

    const shapenedCalendarBars = shapeCalendarBars(layeredCalendarBars)

    const calendarBarTopPosition = 32;
    const calendarBarHeight = 22;
    const calendarBarSpan = 4;

    const positionedCalendarBars = shapenedCalendarBars.map((taskObject) => {
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
      if (month < yearMonth.month) {
        row = 0;
      } else if (month > yearMonth.month) {
        row = 4;
      } else {
        row = Math.ceil(
          (new Date(yearMonth.year, yearMonth.month - 1, 1).getDay() +
            taskObject.startDate.getDate()) /
          7 -
          1
        );
      }
      let top =
        row * 160 +
        calendarBarTopPosition +
        taskObject.layer * (calendarBarHeight + calendarBarSpan);

      // left
      let left = (100 / 7) * taskObject.startDate.getDay();

      return {
        ...taskObject,
        width: `${width}%`,
        top: `${top}px`,
        left: `${left}%`,
      };
    });

    return [calendarDates, positionedCalendarBars]

  }, [])


}