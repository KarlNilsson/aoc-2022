export type Stack = string[];

export type Command = {
  amount: number;
  stackFrom: number;
  stackTo: number;
};

const generateStacks = (stackString: string): Stack[] => {
  const stringStacks = stackString.split('\n');
  const numStacks = Number.parseInt(
    stringStacks.splice(-1)[0].slice(-2, -1),
    10
  );
  const stacks: Stack[] = Array.from(Array(numStacks)).map(() => []);
  let currentRow = stringStacks.pop();
  while (currentRow != null) {
    for (let i = 0; i < numStacks; i += 1) {
      const currentChar = currentRow[i * 4 + 1];
      if (currentChar !== ' ') {
        stacks[i].push(currentChar);
      }
    }
    currentRow = stringStacks.pop();
  }
  return stacks;
};

const generateCommands = (commandsString: string): Command[] => {
  const rawCommands = commandsString.split('\n').map((row) => row.split(' '));
  return rawCommands.map(
    (rawCommand): Command => ({
      amount: Number.parseInt(rawCommand[1], 10),
      stackFrom: Number.parseInt(rawCommand[3], 10) - 1,
      stackTo: Number.parseInt(rawCommand[5], 10) - 1
    })
  );
};

export const parseStacksAndCommands = (data: string): [Stack[], Command[]] => {
  const [rawStacks, rawCommands] = data.split('\n\n');
  const stacks = generateStacks(rawStacks);
  const commands = generateCommands(rawCommands);
  return [stacks, commands];
};
