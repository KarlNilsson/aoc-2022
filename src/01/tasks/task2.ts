import { readFile } from 'fs/promises';
import getGroupedValues from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/01/input2.txt`, {
    encoding: 'utf8'
  });
  const groups: string[] = data.split('\n\n');
  const groupedValues = getGroupedValues(groups);
  const sortedValues = groupedValues.sort((a, b) => b - a);
  const top3 = sortedValues.slice(0, 3);
  return top3.reduce((acc, val) => acc + val, 0);
};

export default Task;
