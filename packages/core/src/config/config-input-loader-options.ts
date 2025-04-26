import type { PathLike } from "../lib/fs";

export type ConfigInputLoaderOptions = {
  configFilePath?: null | string;
  cwd?: null | PathLike;
};
