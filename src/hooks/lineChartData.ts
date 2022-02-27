import { useCallback } from 'react';
import { TASK } from '../../src/features/types';
import { parseString } from '../util/dateHandler';
import { sumByGroupToObject } from '../util/sumByGroup';

type DIVISION = 'daily' | 'weekly' | 'monthly';

type CHART_DATA = {
  label: string;
  value: number;
  percent: number;
};

export default function useCreateLineChartData() {
  return useCallback(
    (
      tasks: TASK[],
      projectStartDate: string,
      projectEndDate: string,
      division: DIVISION
    ): CHART_DATA[] => {
      if (tasks.length === 0) return [];

      const startDate = new Date(projectStartDate);
      const endDate = new Date(projectEndDate);

      // 工数の総和
      const sum = tasks
        .map((task) => task.estimate_manhour ?? 0)
        .reduce((acc, cur) => acc + cur);

      // 日付ごとに完了工数を集計
      const sumByDate = sumByGroupToObject(
        tasks,
        'actual_enddate',
        'estimate_manhour'
      );

      // 完了工数を保有している日付
      const dateHasAmount = Object.keys(sumByDate);
      const dateSpan = (endDate.getTime() - startDate.getTime()) / 86400000;

      const lineData = [...Array(dateSpan)].reduce(
        (acc: CHART_DATA[], cur, idx) => {
          let date = new Date(projectStartDate);
          date.setDate(date.getDate() + idx);
          const dateStr = parseString(date);

          let newValue = 0;
          if (idx !== 0) {
            newValue = acc[idx - 1].value;
          } else {
            acc = [];
          }

          // 完了工数を保有している場合は加算
          if (dateHasAmount.includes(dateStr)) {
            newValue += sumByDate[dateStr];
          }

          const percent = Math.ceil((newValue * 100) / sum);

          return [
            ...acc,
            { label: dateStr, value: newValue, percent: percent },
          ];
        },
        { label: parseString(startDate), value: 0, percent: 0 }
      );

      return lineData;
    },
    []
  );
}
