import type { PathLike } from "../../../../lib/fs";
import type {
  Workspace,
  WorkspacePackageName,
} from "../../workspace";

import type { WorkspaceRegistryResolutionFS } from "./fs";

export type WorkspaceRegistryResolutionOptions = {
  cwd?: null | PathLike;
  fs?: null | WorkspaceRegistryResolutionFS;
  workspaces?: null | Record<WorkspacePackageName, Workspace>;
};
