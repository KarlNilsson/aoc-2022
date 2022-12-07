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

const root: ElfFolder = {
  type: 'folder',
  name: '/',
  contents: {}
};

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

const listFolder = (currentFolder: ElfFolder, entries: string[]) => {
  const { contents } = currentFolder;
  for (let i = 0; i < entries.length; i += 1) {
    const [meta, name] = entries[i].split(' ');

    if (meta === 'dir') {
      if (contents[name] == null) {
        contents[name] = {
          type: 'folder',
          name,
          contents: { '..': currentFolder }
        };
      }
    } else {
      const file: ElfFile = {
        type: 'file',
        size: Number(meta),
        name
      };
      if (contents[file.name] == null) {
        contents[file.name] = file;
      }
    }
  }
};

const changeDir = (currentFolder: ElfFolder, target: string) => {
  return currentFolder.contents[target] as ElfFolder;
};

export const createFileStructure = (data: string): ElfFolder => {
  const command = data.split('$ ');
  root.contents['..'] = root;
  let currentFolder = root;

  for (let i = 0; i < command.length; i += 1) {
    const [cmd, ...output] = command[i].split('\n');
    const [...args] = cmd.split(' ');

    if (args[0] === 'ls') {
      const entityList = output.filter(Boolean);
      listFolder(currentFolder, entityList);
    } else if (args[0] === 'cd') {
      if (args[1] === '/') {
        currentFolder = root;
      } else {
        currentFolder = changeDir(currentFolder, args[1]);
      }
    }
  }

  return root;
};
