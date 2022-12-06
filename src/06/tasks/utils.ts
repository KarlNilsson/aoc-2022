// eslint-disable-next-line import/prefer-default-export
export const findUniqueSet = (data: string, setSize: number) => {
  const charArray = [...data.slice(0, setSize)];
  for (let i = setSize; i < data.length; i += 1) {
    charArray[i % setSize] = data[i];
    if (new Set(charArray).size === charArray.length) {
      return i + 1;
    }
  }
  return -1;
};
