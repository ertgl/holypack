import type { Path } from "@holypack/core/lib/path/Path";
import type { Project } from "@holypack/core/plugins/project/models/Project";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";

import type { JestEnv } from "./JestEnv";
import type { JestPaths } from "./JestPaths";

export type JestContext = {
  cwd: Path;
  env: JestEnv;
  paths: JestPaths;
  project: Readonly<Project>;
  workspace: Readonly<Workspace>;
  workspaces: readonly Readonly<Workspace>[];
};
