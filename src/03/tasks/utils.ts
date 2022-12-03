// eslint-disable-next-line import/prefer-default-export
export const getCharCodeValue = (char: string) => {
  const charZ = 90;
  const charCode = char.charCodeAt(0);
  if (charCode <= charZ) {
    return charCode - 38;
  }
  return charCode - 96;
};
