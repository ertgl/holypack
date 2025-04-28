import type { PathLike } from "../../../lib/fs";
import type { PackageJSON } from "../../package";
import type { Workspace } from "../../workspace";

import type { WorkspaceResolutionFS } from "./fs";

export type WorkspaceResolutionOptions = {
  cwd?: null | PathLike;
  fs?: null | WorkspaceResolutionFS;
  packageJSON?: null | PackageJSON;
  workspace?: null | Workspace;
};
