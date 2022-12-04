import { readFile } from 'fs/promises';
import { mapNumberPairs } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/04/input2.txt`, {
    encoding: 'utf8'
  });
  const pairs = mapNumberPairs(data.split('\n'));
  const containingPairs = pairs.filter((numPair) => {
    const [lowerA, upperA] = numPair[0];
    const [lowerB, upperB] = numPair[1];
    return (
      (lowerA <= lowerB && upperA >= upperB) ||
      (lowerB <= lowerA && upperB >= upperA)
    );
  });
  return containingPairs.length;
};

export default Task;
