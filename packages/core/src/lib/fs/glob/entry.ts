import type { Entry as FastGlobEntry } from "fast-glob";

export type GlobEntry = {
  _dirent: FastGlobEntry["dirent"];
  path: string;
};
