import { readFile } from 'fs/promises';
import { calculateRoundScore, Round } from './utils';

const Task = async () => {
  console.time('Task1');
  const data = await readFile(`${__dirname}/../../../input/02/input2.txt`, {
    encoding: 'utf8'
  });
  const roundData = data
    .split('\n')
    .filter(Boolean)
    .map((round) => round.split(' '));
  const roundResults = roundData.map((round) =>
    calculateRoundScore({
      p1: round[0] as Round['p1'],
      p2: round[1] as Round['p2']
    })
  );
  const tmep = roundResults.reduce((a, b) => a + b, 0);
  console.timeEnd('Task1');
  return tmep;
};

export default Task;
