import type { GlobFS } from "./fs";

export type GlobOptions = {
  concurrency?: null | number;
  followSymbolicLinks?: boolean | null;
  fs?: GlobFS | null;
  ignore?: null | string[];
  onlyDirectories?: boolean | null;
  onlyFiles?: boolean | null;
};
