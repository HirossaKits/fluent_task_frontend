import { useCallback } from 'react';
import { getToday, parseDate } from '../util/dateHandler';

export default function usePorgress() {
  return useCallback(
    (scheduledDate: null | string, actualDate: null | string) => {
      let progress = null;

      if (scheduledDate) {
        const sDate = parseDate(scheduledDate);
        if (actualDate) {
          progress =
            (sDate.getTime() - parseDate(actualDate).getTime()) / 86400000;
        } else if (sDate < getToday()) {
          progress = (sDate.getTime() - getToday().getTime()) / 86400000;
        }
      }
      return progress;
    },
    []
  );
}
