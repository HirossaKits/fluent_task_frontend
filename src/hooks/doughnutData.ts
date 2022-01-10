import { useCallback } from 'react'
import { TASK } from '../../src/features/types'
import { sumByGroupToObject } from '../util/sumByGroup'
import { Status } from '../features/types'

type DOUGHNUT_DATA =
  {
    label: string,
    value: number,
    percent: number
  }

export default function useCreateDoughnutData() {

  return useCallback((tasks: TASK[]): DOUGHNUT_DATA[] => {

    if (tasks.length === 0) return []

    // 工数の総和
    const sum = tasks.map((task) => task.estimate_manhour ?? 0).reduce((acc, cur) => acc + cur)

    // ステータスごとに完了工数を集計
    const sumByStatus = sumByGroupToObject(tasks, 'status', 'estimate_manhour')

    const statusKeys: (keyof typeof Status)[] = ['Done', 'On going', 'Not started', 'Suspended']

    const doughnutData = statusKeys.map((elem) => ({
      label: Status[elem],
      value: sumByStatus[elem],
      percent: Math.round(sumByStatus[elem] * 100 / sum)
    }))

    return doughnutData
  }, [])
}