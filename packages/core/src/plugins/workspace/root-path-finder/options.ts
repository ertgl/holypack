import type { WorkspaceRootPathFinderFS } from "./fs";

export type WorkspaceRootPathFinderOptions = {
  cwd?: null | string;
  fs?: null | WorkspaceRootPathFinderFS;
};
