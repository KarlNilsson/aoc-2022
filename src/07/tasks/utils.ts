export type ElfFile = {
  type: 'file';
  name: string;
  size: number;
};

export type ElfFolder = {
  type: 'folder';
  name: string;
  contents: Record<string, ElfFile | ElfFolder>;
};

type Command = { cmd: 'ls' } | { cmd: 'cd'; arg: string };

const printFolderLine = (folder: ElfFolder, indentation: number) => {
  console.log(`${Array(indentation).join(' ')}- ${folder.name} (dir)`);
};

const printFileLine = (file: ElfFile, indentation: number) => {
  console.log(
    `${Array(indentation).join(' ')}- ${file.name} (file, size=${file.size})`
  );
};

export const printFolderContents = (folder: ElfFolder, indentation: number) => {
  printFolderLine(folder, indentation);
  Object.entries(folder.contents).forEach(([name, value]) => {
    if (value.type === 'file') {
      printFileLine(value, indentation + 2);
    }
    if (value.type === 'folder' && name !== '..') {
      printFolderContents(value, indentation + 2);
    }
  });
};

export const getDirectorySize = (folder: ElfFolder): number => {
  return Object.entries(folder.contents).reduce((acc, [name, content]) => {
    if (content.type === 'file') {
      return acc + content.size;
    }
    if (name !== '..') {
      return acc + getDirectorySize(content);
    }
    return 0;
  }, 0);
};

export const sizeForDirs = (folder: ElfFolder) => {
  let dirList: Array<{ folderName: string; size: number }> = [
    { folderName: folder.name, size: getDirectorySize(folder) }
  ];
  Object.entries(folder.contents).forEach(([name, value]) => {
    if (value.type === 'folder' && name !== '..') {
      dirList = dirList.concat(sizeForDirs(value));
    }
  });
  return dirList;
};

export const createFileStructure = (data: string): ElfFolder => {
  const output = data.split('\n');
  const root: ElfFolder = {
    type: 'folder',
    name: '/',
    contents: {}
  };
  root.contents['..'] = root;
  let currentFolder = root;
  let currentCommand: Command = { cmd: 'cd', arg: '/' };
  for (let i = 1; i < output.length; i += 1) {
    const rowContents = output[i].split(' ');
    if (rowContents[0] === '$') {
      if (rowContents[1] === 'ls') {
        currentCommand = { cmd: 'ls' };
      } else if (rowContents[1] === 'cd') {
        const arg = rowContents[2];
        currentCommand = { cmd: 'cd', arg };
        currentFolder = currentFolder.contents[currentCommand.arg] as ElfFolder;
      }
    } else if (currentCommand.cmd === 'ls') {
      const entityName = rowContents[1];
      if (rowContents[0] === 'dir') {
        if (currentFolder.contents[entityName] == null) {
          currentFolder.contents[entityName] = {
            type: 'folder',
            name: entityName,
            contents: { '..': currentFolder }
          };
        }
      } else {
        const file: ElfFile = {
          type: 'file',
          size: Number(rowContents[0]),
          name: rowContents[1]
        };
        if (currentFolder.contents[file.name] == null) {
          currentFolder.contents[file.name] = file;
        }
      }
    }
  }

  return root;
};
