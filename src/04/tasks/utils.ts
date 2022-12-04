// eslint-disable-next-line import/prefer-default-export
export const mapNumberPairs = (pairs: string[]) => {
  const splitPairs = pairs.map((pair) => pair.split(','));
  return splitPairs.map((pair) => [
    pair[0].split('-').map((num) => Number.parseInt(num, 10)),
    pair[1].split('-').map((num) => Number.parseInt(num, 10))
  ]);
};
