import { useCallback } from 'react';
import {
  TASK,
  PROJECT,
  GANTTCHART_BAR,
  GANTTCHART_TABLE_STYLE,
} from '../features/types';
import { parseDate, getDateSpan } from '../util/dateHandler';

const useCreateGanttChartBar = () => {
  return useCallback(
    (
      project: PROJECT,
      tasks: TASK[],
      tableStyle: GANTTCHART_TABLE_STYLE
    ): GANTTCHART_BAR[] => {
      const projectStartDate = parseDate(project.startdate);
      const projectEndDate = parseDate(project.enddate);

      // const tes = tasks.map((task) => ({...task}))

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

      // ガントチャートのバー
      const ganttChartBars: GANTTCHART_BAR[] = sortedTasks.map((task, idx) => {
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
        let top = tableStyle.cellHeight * idx;

        // left
        let left =
          tableStyle.cellWidth * getDateSpan(startDate, projectStartDate);

        return {
          ...task,
          top: top,
          left: left,
          width: width,
        };
      });

      return ganttChartBars;
    },
    []
  );
};

export default useCreateGanttChartBar;
