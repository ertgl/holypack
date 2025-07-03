import type {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  glob as GlobFunction,
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  globSync as GlobFunctionSync,
  lstat as LStatFunction,
  lstatSync as LStatFunctionSync,
  mkdir as MkdirFunction,
  mkdirSync as MkdirFunctionSync,
  readFile as ReadFileFunction,
  readFileSync as ReadFileFunctionSync,
  writeFile as WriteFileFunction,
  writeFileSync as WriteFileFunctionSync,
} from "node:fs";

export type CustomFileSystem = {
  glob: typeof GlobFunction;
  globSync: typeof GlobFunctionSync;
  lstat: typeof LStatFunction;
  lstatSync: typeof LStatFunctionSync;
  mkdir: typeof MkdirFunction;
  mkdirSync: typeof MkdirFunctionSync;
  readFile: typeof ReadFileFunction;
  readFileSync: typeof ReadFileFunctionSync;
  writeFile: typeof WriteFileFunction;
  writeFileSync: typeof WriteFileFunctionSync;
};
