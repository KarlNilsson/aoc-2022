import { readFile } from 'fs/promises';
import { createFileStructure, sizeForDirs } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/07/input2.txt`, {
    encoding: 'utf8'
  });
  const fileTree = createFileStructure(data);
  const dirSizes = sizeForDirs(fileTree);
  return dirSizes
    .filter((dir) => dir.size <= 100_000)
    .reduce((acc, dir) => acc + dir.size, 0);
};

export default Task;
