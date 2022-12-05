import { readFile } from 'fs/promises';
import { parseStacksAndCommands } from './utils';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/05/input2.txt`, {
    encoding: 'utf8'
  });
  const [stacks, commands] = parseStacksAndCommands(data);
  commands.forEach((command) => {
    const load = stacks[command.stackFrom].splice(command.amount * -1);
    if (load != null) {
      stacks[command.stackTo] = stacks[command.stackTo].concat(load);
    }
  });
  return stacks.reduce((acc, stack) => `${acc}${stack.pop()}`, '');
};

export default Task;
