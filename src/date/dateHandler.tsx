// 文字列を指定した桁数で0埋めする
export const fillDigitsByZero = (num: Number, digit: Number): string => {
  let val = num.toString() + "";
  if (val.length === 1) {
    val = "0" + val;
  }
  return val;
};

// yyyy-MM-dd 形式の文字列を日付に変換する
export const parseDate = (value: string): Date => {
  try {
    const year = parseInt(value.substr(0, 4));
    const month = parseInt(value.substr(5, 2));
    const date = parseInt(value.substr(8, 2));
    return new Date(year, month, date);
  } catch {
    return new Date(value);
  }
};

// 日付を yyyy-MM-dd形式の文字列に変換する
export const parseString = (value: Date): string => {
  if (value) {
    const year = value.getFullYear();
    const month = fillDigitsByZero(value.getMonth() + 1, 2);
    const date = fillDigitsByZero(value.getDate(), 2);
    return `${year}-${month}-${date}`;
  } else {
    return "";
  }
};

// 月の初日の曜日を返す
export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay;
};

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
export const getLastDateOfCalendar = (year: number, month: number): Date => {
  let firstDay = new Date(year, month - 1, 1).getDay();
  let lastDate = new Date(year, month - 1, 35 - firstDay);
  return lastDate;
};

// 開始日と終了日から日数を返す
export const getDateSpan = (start: Date, end: Date): number => {
  return (start.valueOf() - end.valueOf()) / 86400000 + 1;
};
