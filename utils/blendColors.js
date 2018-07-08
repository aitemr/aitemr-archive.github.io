const intToHex = num => {
  let hex = Math.round(num).toString(16);
  if (hex.length === 1) hex = `0${hex}`;
  return hex;
};

const blendColors = (color1, color2, percentage) => {
  let colorOne = color1;
  let colorTwo = color2;
  const blendPercentage = percentage || 0.5;

  if (colorOne.length === 4)
    colorOne =
      colorOne[1] +
      colorOne[1] +
      colorOne[2] +
      colorOne[2] +
      colorOne[3] +
      colorOne[3];
  else colorOne = colorOne.substring(1);
  if (colorTwo.length === 4)
    colorTwo =
      colorTwo[1] +
      colorTwo[1] +
      colorTwo[2] +
      colorTwo[2] +
      colorTwo[3] +
      colorTwo[3];
  else colorTwo = colorTwo.substring(1);

  colorOne = [
    parseInt(colorOne[0] + colorOne[1], 16),
    parseInt(colorOne[2] + colorOne[3], 16),
    parseInt(colorOne[4] + colorOne[5], 16)
  ];

  colorTwo = [
    parseInt(colorTwo[0] + colorTwo[1], 16),
    parseInt(colorTwo[2] + colorTwo[3], 16),
    parseInt(colorTwo[4] + colorTwo[5], 16)
  ];

  let color3 = [
    (1 - blendPercentage) * colorOne[0] + blendPercentage * colorTwo[0],
    (1 - blendPercentage) * colorOne[1] + blendPercentage * colorTwo[1],
    (1 - blendPercentage) * colorOne[2] + blendPercentage * colorTwo[2]
  ];

  color3 = `#${intToHex(color3[0])}${intToHex(color3[1])}${intToHex(
    color3[2]
  )}`;

  return color3;
};

// eslint-disable-next-line import/prefer-default-export
export { blendColors };
