export const convertColorCodeToRGBA = (
  colorCode: string,
  alpha: number = 1
) => {
  const rgbaRed = parseInt(colorCode.substring(1, 3), 16);
  const rgbaGreen = parseInt(colorCode.substring(3, 5), 16);
  const rgbaBlue = parseInt(colorCode.substring(5, 7), 16);

  return `rgba(${rgbaRed},${rgbaGreen},${rgbaBlue},${alpha})`;
};
