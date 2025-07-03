import type { Path } from "@holypack/core/lib/path/Path";
import type { Project } from "@holypack/core/plugins/project/models/Project";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";

import type { WebpackEnv } from "./WebpackEnv";
import type { WebpackPaths } from "./WebpackPaths";

export type WebpackContext = {
  cwd: Path;
  env: WebpackEnv;
  paths: WebpackPaths;
  project: Readonly<Project>;
  workspace: Readonly<Workspace>;
  workspaces: readonly Readonly<Workspace>[];
};
