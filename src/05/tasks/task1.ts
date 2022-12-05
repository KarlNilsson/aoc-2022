import { readFile } from 'fs/promises';
import { parseStacksAndCommands } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/05/input2.txt`, {
    encoding: 'utf8'
  });
  const [stacks, commands] = parseStacksAndCommands(data);
  commands.forEach((command) => {
    for (let i = 0; i < command.amount; i += 1) {
      const load = stacks[command.stackFrom].pop();
      if (load != null) {
        stacks[command.stackTo].push(load);
      }
    }
  });
  return stacks.reduce((acc, stack) => `${acc}${stack.pop()}`, '');
};

export default Task;
