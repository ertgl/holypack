import type { ProjectRootPathFinderFS } from "./fs";

export type ProjectRootPathFinderOptions = {
  cwd?: null | string;
  fs?: null | ProjectRootPathFinderFS;
};
