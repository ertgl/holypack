import type { TSConfigRootDirectoryPathFinderFS } from "./fs";

export type TSConfigRootDirectoryPathFinderOptions = {
  cwd?: null | string;
  fs?: null | TSConfigRootDirectoryPathFinderFS;
};
