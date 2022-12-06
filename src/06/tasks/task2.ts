import { readFile } from 'fs/promises';
import { findUniqueSet } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/06/input2.txt`, {
    encoding: 'utf8'
  });
  return findUniqueSet(data, 14);
};

export default Task;
