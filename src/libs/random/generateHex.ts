export const generateHex = (length = 6) =>
  Math.random()
    .toString(16)
    .substring(2, length + 2);
