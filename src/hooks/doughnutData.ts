import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TASK } from '../../src/features/types';
import { sumByGroupToObject } from '../util/sumByGroup';
import { Status } from '../features/types';

type DOUGHNUT_DATA = {
  label: string;
  value: number;
  percent: number;
};

export default function useCreateDoughnutData() {
  const { t } = useTranslation();

  return useCallback((tasks: TASK[]): DOUGHNUT_DATA[] => {
    if (tasks.length === 0) return [];

    // 工数の総和
    const sum = tasks
      .map((task) => task.estimate_manhour ?? 0)
      .reduce((acc, cur) => acc + cur);

    // ステータスごとに完了工数を集計
    const sumByStatus = sumByGroupToObject(tasks, 'status', 'estimate_manhour');

    const statusKeys: { status: keyof typeof Status; label: string }[] = [
      { status: 'Done', label: t('status.done') },
      { status: 'On going', label: t('status.onGoing') },
      { status: 'Not started', label: t('status.notStarted') },
      { status: 'Suspended', label: t('status.suspended') },
    ];

    const doughnutData = statusKeys.map((elem) => ({
      label: elem.label,
      value: sumByStatus[elem.status],
      percent: Math.round((sumByStatus[elem.status] * 100) / sum),
    }));

    return doughnutData;
  }, []);
}
