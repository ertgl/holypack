import type { PathLike } from "../../../lib/fs";

export type ConfigDefinitionLoaderOptions = {
  configFilePath?: null | string;
  cwd?: null | PathLike;
};
