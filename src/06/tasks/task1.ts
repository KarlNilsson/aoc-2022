import { readFile } from 'fs/promises';
import { findUniqueSet } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/06/input2.txt`, {
    encoding: 'utf8'
  });
  return findUniqueSet(data, 4);
};

export default Task;
