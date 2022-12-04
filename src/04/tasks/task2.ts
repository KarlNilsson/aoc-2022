import { readFile } from 'fs/promises';
import { mapNumberPairs } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/04/input2.txt`, {
    encoding: 'utf8'
  });
  const pairs = mapNumberPairs(data.split('\n'));
  const numOverlaps = pairs.filter((pair) => {
    const [lowerA, upperA] = pair[0];
    const [lowerB, upperB] = pair[1];
    return (
      (lowerB <= upperA && upperB >= upperA) ||
      (lowerA <= upperB && upperA >= upperB)
    );
  });
  return numOverlaps.length;
};

export default Task;
