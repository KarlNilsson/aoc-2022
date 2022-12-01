import { readFile } from 'fs/promises';
import getGroupedValues from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/01/input2.txt`, {
    encoding: 'utf8'
  });
  const groups: string[] = data.split('\n\n');
  const groupedValues = getGroupedValues(groups);
  return Math.max(...groupedValues);
};

export default Task;
