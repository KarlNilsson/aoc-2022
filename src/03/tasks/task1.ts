import { readFile } from 'fs/promises';
import { getCharCodeValue } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/03/input2.txt`, {
    encoding: 'utf8'
  });
  const rucksacks = data.split('\n').filter(Boolean);
  const compartments = rucksacks.map((rucksack) => [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2)
  ]);
  const duplicates = compartments.map(([compA, compB]) => {
    const [duplicate] = [...compA].filter((char) => compB.includes(char));
    return duplicate;
  });
  return duplicates.reduce(
    (acc, duplicate) => acc + getCharCodeValue(duplicate),
    0
  );
};

export default Task;
