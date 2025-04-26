import type { RootPathFinderFS } from "./fs";
import type { RootPathFinderTarget } from "./target";

export type RootPathFinderOptions = {
  accessMode?: null | number;
  fs?: null | RootPathFinderFS;
  includeSelf?: boolean | null;
  target?: null | RootPathFinderTarget;
};
export const ROOT_PATH_FINDER_INCLUDE_SELF_DEFAULT = true;
