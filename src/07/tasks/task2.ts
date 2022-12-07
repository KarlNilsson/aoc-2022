import { readFile } from 'fs/promises';
import { createFileStructure, getDirectorySize, sizeForDirs } from './utils';

const MAX_SPACE = 70_000_000;
const MIN_UNUSED_SPACE = 30_000_000;

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/07/input1.txt`, {
    encoding: 'utf8'
  });
  const fileTree = createFileStructure(data);
  const availableSpace = MAX_SPACE - getDirectorySize(fileTree);
  const requiredSpace = MIN_UNUSED_SPACE - availableSpace;
  const dirSizes = sizeForDirs(fileTree);
  return dirSizes
    .filter((dir) => dir.size >= requiredSpace)
    .sort((a, b) => a.size - b.size)[0].size;
};

export default Task;
