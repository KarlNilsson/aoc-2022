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
  const sortedValues = groupValues.sort((a, b) => b - a);
  const top3 = sortedValues.slice(0, 3);
  return top3.reduce((acc, val) => acc + val, 0);
};

export default Task;
