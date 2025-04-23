import type { PathLike } from "../../../fs";
import type { Workspace } from "../workspace";
import type { WorkspacePackageName } from "../workspace";

import type { WorkspaceRegistryResolutionFS } from "./fs";

export type WorkspaceRegistryResolutionOptions = {
  cwd?: null | PathLike;
  fs?: null | WorkspaceRegistryResolutionFS;
  workspaces?: null | Record<WorkspacePackageName, Workspace>;
};
