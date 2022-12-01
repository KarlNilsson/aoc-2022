import { readFile } from 'fs/promises';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/01/input2.txt`, {
    encoding: 'utf8'
  });
  const groups: string[] = data.split('\n\n');
  const calorieGroups = groups.map((group) =>
    group
      .split('\n')
      .map((num) => Number.parseInt(num, 10))
      .filter(Boolean)
  );
  const groupValues = calorieGroups.map((calorieGroup) =>
    calorieGroup.reduce((acc, val) => acc + val, 0)
  );
  return Math.max(...groupValues);
};

export default Task;
