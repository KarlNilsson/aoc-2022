import { readFile } from 'fs/promises';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/00/input2.txt`, {
    encoding: 'utf8'
  });
  console.log(data);
};

export default Task;
