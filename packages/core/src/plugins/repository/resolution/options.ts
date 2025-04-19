import type { PathLike } from "../../../fs";
import type { Repository } from "../repository";

import type { RepositoryResolutionFS } from "./fs";

export type RepositoryResolutionOptions = {
  cwd?: null | PathLike;
  fs?: null | RepositoryResolutionFS;
  repository?: null | Repository;
};
