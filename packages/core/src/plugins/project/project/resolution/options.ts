import type { PathLike } from "../../../../lib/fs";
import type { Project } from "../project";

import type { ProjectResolutionFS } from "./fs";

export type ProjectResolutionOptions = {
  cwd?: null | PathLike;
  fs?: null | ProjectResolutionFS;
  project?: null | Project;
};
