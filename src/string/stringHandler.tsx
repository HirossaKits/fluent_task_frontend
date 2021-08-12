export const fillDigitsByZero = (num: Number, digit): string => {
  let val = num.toString() + "";
  if (val.length === 1) {
    val = "0" + val;
  }
  return val;
};
