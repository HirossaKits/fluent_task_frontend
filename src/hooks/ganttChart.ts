import { useCallback } from 'react';
import {
  TASK,
  PROJECT,
  GANTTCHART_BAR,
  GANTTCHART_BAR_SET,
  GANTTCHART_TABLE_STYLE,
  GANTTCHART_BAR_STYLE,
} from '../features/types';
import { parseDate, getDateSpan } from '../util/dateHandler';

const useCreateGanttChartBar = () => {
  return useCallback(
    (
      project: PROJECT,
      tasks: TASK[],
      tableStyle: GANTTCHART_TABLE_STYLE,
      barStyle: GANTTCHART_BAR_STYLE
    ): GANTTCHART_BAR_SET => {
      const projectStartDate = parseDate(project.startdate);
      const projectEndDate = parseDate(project.enddate);

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
              return 1;
            } else if (endA > endB) {
              return -1;
            } else {
              return 0;
            }
          }
        });

      // ガントチャートのバーの margin-top
      const mTop = (tableStyle.cellHeight - barStyle.height * 2) / 3;

      // ガントチャートのバー(予定)
      const scheduledGanttChartBars: GANTTCHART_BAR[] = sortedTasks.map(
        (task, idx) => {
          let startDate = parseDate(task.scheduled_startdate);
          let endDate = parseDate(task.scheduled_enddate);

          // プロジェクトの期間をオーバーする場合、プロジェクトの開始日と終了日に合わせる。
          if (startDate.getTime() < projectStartDate.getTime()) {
            startDate = projectStartDate;
            // bar.startEdge = false;
          }
          if (projectEndDate.getTime() < endDate.getTime()) {
            endDate = projectEndDate;
            // bar.endEdge = false;
          }

          // span
          const span = getDateSpan(startDate, endDate);

          // width
          const width = tableStyle.cellWidth * span;

          // top
          let top = mTop + tableStyle.cellHeight * (idx + 1);

          // left
          let left =
            tableStyle.headerColumnWidth +
            tableStyle.cellWidth *
              (getDateSpan(startDate, projectStartDate) - 1);

          return {
            ...task,
            top: top,
            left: left,
            width: width,
            startEdge: true,
            endEdge: true,
          };
        }
      );

      // ガントチャートのバー(予定)
      const actualGanttChartBars = sortedTasks
        .map((task, idx) => {
          if (!task.actual_startdate || !task.actual_enddate) {
            return undefined;
          }

          let startDate = parseDate(task.actual_startdate);
          let endDate = parseDate(task.actual_enddate);

          if (
            parseDate(task.actual_enddate).getTime() <
              projectStartDate.getTime() ||
            projectEndDate.getTime() <
              parseDate(task.actual_startdate).getTime() ||
            projectEndDate.getTime() <
              parseDate(task.actual_startdate).getTime()
          ) {
            return undefined;
          }

          // プロジェクトの期間をオーバーする場合、プロジェクトの開始日と終了日に合わせる。
          if (startDate.getTime() < projectStartDate.getTime()) {
            startDate = projectStartDate;
            // bar.startEdge = false;
          }
          if (projectEndDate.getTime() < endDate.getTime()) {
            endDate = projectEndDate;
            // bar.endEdge = false;
          }

          // span
          const span = getDateSpan(startDate, endDate);

          // width
          const width = tableStyle.cellWidth * span;

          // top
          let top =
            mTop * 2 + barStyle.height + tableStyle.cellHeight * (idx + 1);

          // left
          let left =
            tableStyle.headerColumnWidth +
            tableStyle.cellWidth *
              (getDateSpan(startDate, projectStartDate) - 1);

          return {
            ...task,
            top: top,
            left: left,
            width: width,
            startEdge: true,
            endEdge: true,
          };
        })
        .filter((bar) => bar !== undefined);

      return {
        scheduled: scheduledGanttChartBars,
        actual: actualGanttChartBars as GANTTCHART_BAR[],
      };
    },
    []
  );
};

export default useCreateGanttChartBar;
