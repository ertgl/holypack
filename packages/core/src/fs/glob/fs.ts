import type { readdir as _readdir } from "node:fs";

export type GlobFS = {
  readdir?: null | typeof _readdir;
};
