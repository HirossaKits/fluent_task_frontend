import { useCallback } from "react"
import { TASK, CALENDAR_BAR, CALENDAR_YEAR_MONTH, CALENDAR_DATE, CALENDAR_BAR_STYLE } from "../features/types";
import * as dateHandler from '../util/dateHandler';

export const useCalendarFactory = () => {
  return useCallback((yearMonth: CALENDAR_YEAR_MONTH, tasks: TASK[], barStyle: CALENDAR_BAR_STYLE): [CALENDAR_DATE[], CALENDAR_BAR[]] => {

    const firstDateOfCalendar = dateHandler.getFirstDateOfCalendar(yearMonth.year, yearMonth.month)
    const lastDateOfCalendar = dateHandler.getLastDateOfCalendar(yearMonth.year, yearMonth.month)

    const firstDayOfCalendar = dateHandler.getFirstDayOfCalendar(yearMonth.year, yearMonth.month)

    // カレンダーの日付
    const calendarDates: CALENDAR_DATE[] = [...Array(35)].map((_, idx) => {
      const dt = new Date(yearMonth.year, yearMonth.month - 1, idx - firstDayOfCalendar + 1);
      return {
        index: idx,
        dateStr: dateHandler.parseString(dt),
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        date: dt.getDate(),
        isToday: dt.getTime() === dateHandler.getToday().getTime(),
        layer: []
      }
    })

    // カレンダーのバー 
    const calendarBars: CALENDAR_BAR[] = tasks.map((task) => {

      const startDate = dateHandler.parseDate(task.scheduled_startdate);
      const endDate = dateHandler.parseDate(task.scheduled_enddate);
      const dateSpan = (endDate.getTime() - startDate.getTime()) / 86400000 + 1

      return {
        task_id: task.task_id,
        task_name: task.task_name,
        startDate: startDate,
        endDate: endDate,
        dateSpan: dateSpan,
        startDateNum: startDate.getDate(),
        startDayNum: startDate.getDay(),
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

    // 開始日と期間でソート
    calendarBars.sort((a, b) => {

      const numA = a.startDate.getTime()
      const numB = b.startDate.getTime()

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

    // カレンダーに表示されない日付を除外、期間を再設定
    const trimedCalendarBars: CALENDAR_BAR[] = calendarBars.filter((bar) => (
      !(bar.endDate.getTime() < firstDateOfCalendar.getTime() || lastDateOfCalendar.getTime() < bar.startDate.getTime())
    )).map((bar) => {
      if (bar.startDate.getTime() < firstDateOfCalendar.getTime()) {
        bar.startDate = firstDateOfCalendar;
        bar.startEdge = false;
      }
      if (lastDateOfCalendar.getTime() < bar.endDate.getTime()) {
        bar.endDate = lastDateOfCalendar;
        bar.endEdge = false;
      }
      console.log('bar.startDate', bar.startDate)
      console.log('bar.endDate', bar.endDate)
      bar.dateSpan =
        (bar.endDate.getTime() - bar.startDate.getTime()) / 86400000 +
        1;
      return bar
    })

    console.log('trimedCalendarBars', trimedCalendarBars)

    // レイヤーを設定
    const layeredCalendarBars: CALENDAR_BAR[] = trimedCalendarBars.map((bar, idx) => {

      const startDateStr = dateHandler.parseString(bar.startDate)
      const startIndex = calendarDates.find((date) => date.dateStr === startDateStr)?.index ?? 0
      const layerArray = calendarDates[startIndex].layer
      const maxLayer = layerArray ? Math.max(...layerArray) : 0;

      let newlayer = 0;
      for (let i = 0; i <= maxLayer + 1; i++) {
        newlayer = i
        if (!calendarDates[startIndex].layer.includes(i)) {
          break
        }
      }

      // バーのレイヤーを設定
      for (let i = 0; i < bar.dateSpan; i++) {
        if (startIndex !== undefined && startIndex + i < 35) {
          calendarDates[startIndex + i].layer.push(newlayer);
        }
      }

      // カレンダーの日付にもレイヤーの情報を保持
      const visible = newlayer < 4;
      return { ...bar, layer: newlayer, visible: visible };
    });

    const shapeCalendarBars = (bars: CALENDAR_BAR[]): CALENDAR_BAR[] => {

      let shapedTasks: CALENDAR_BAR[] = [];

      for (let i = 0; i < bars.length; i++) {

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

    const positionedCalendarBars = shapenedCalendarBars.map((taskObject) => {
      // span
      let span =
        (taskObject.endDate.getTime() - taskObject.startDate.getTime()) /
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
        barStyle.topPosition +
        taskObject.layer * (barStyle.height + barStyle.span);

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