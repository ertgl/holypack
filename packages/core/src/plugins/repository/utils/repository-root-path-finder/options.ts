import type { RepositoryRootPathFinderFS } from "./fs";

export type RepositoryRootPathFinderOptions = {
  cwd?: null | string;
  fs?: null | RepositoryRootPathFinderFS;
};
