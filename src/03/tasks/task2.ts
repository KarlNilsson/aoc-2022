import { readFile } from 'fs/promises';
import { getCharCodeValue } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/03/input2.txt`, {
    encoding: 'utf8'
  });
  const lines = data.split('\n').filter(Boolean);
  const elfPairs = [];
  for (let i = 0; i < lines.length; i += 3) {
    elfPairs.push(lines.slice(i, i + 3));
  }
  const duplicates = elfPairs.map(([ruckA, ruckB, ruckC]) => {
    const [duplicate] = [...ruckA].filter(
      (char) => ruckB.includes(char) && ruckC.includes(char)
    );
    return duplicate;
  });
  return duplicates.reduce(
    (acc, duplicate) => acc + getCharCodeValue(duplicate),
    0
  );
};

export default Task;
