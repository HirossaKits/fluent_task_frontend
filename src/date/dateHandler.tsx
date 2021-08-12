// 月の初日を返す
export const getFirstDateOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1);
};

// 月の最終日を返す
export const getLastDateOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 0);
};

// カレンダーに表示される最初の日付を返す
export const getFirstDateOfCalendar = (year: number, month: number): Date => {
  let firstDay = new Date(year, month - 1, 1).getDay();
  let firstDate = new Date(year, month - 1, 1 - firstDay);
  return firstDate;
};

// カレンダーに表示される最後の日付を返す
export const getlastDateOfCalendar = (year: number, month: number): Date => {
  let firstDay = new Date(year, month - 1, 1).getDay();
  let lastDate = new Date(year, month - 1, 35 - firstDay);
  return lastDate;
};

// 開始日と終了日から日数を返す
export const getDateSpan = (start: Date, end: Date): number => {
  return (start.valueOf() - end.valueOf()) / 86400000 + 1;
};
