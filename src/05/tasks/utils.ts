export type Stack = string[];

export type Command = {
  amount: number;
  stackFrom: number;
  stackTo: number;
};

const generateStacks = (stackString: string): Stack[] => {
  const stringStacks = stackString.split('\n');
  const numStacks = Number(stringStacks.splice(-1)[0].slice(-2, -1));
  const stacks: Stack[] = Array.from(Array(numStacks)).map(() => []);
  for (let i = stringStacks.length - 1; i >= 0; i -= 1) {
    const stackLetters = Array.from(stringStacks[i].matchAll(/[A-Z]/g));
    stackLetters.forEach((letter) => {
      if (letter.index != null && letter[0] != null)
        stacks[(letter.index - 1) / 4].push(letter[0]);
    });
  }
  return stacks;
};

const generateCommands = (commandsString: string): Command[] => {
  const rawCommands = commandsString
    .split('\n')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((row) => row.match(/\d+/g)!.map(Number));
  return rawCommands.map(
    (rawCommand): Command => ({
      amount: Number(rawCommand[0]),
      stackFrom: Number(rawCommand[1]) - 1,
      stackTo: Number(rawCommand[2]) - 1
    })
  );
};

export const parseStacksAndCommands = (data: string): [Stack[], Command[]] => {
  const [rawStacks, rawCommands] = data.split('\n\n');
  const stacks = generateStacks(rawStacks);
  const commands = generateCommands(rawCommands);
  return [stacks, commands];
};
