import type { Optional } from "../../../../lib/object/Optional";

import type { WorkspaceRootPathFinderFSSync } from "./WorkspaceRootPathFinderFSSync";
import type { WorkspaceRootPathFinderOptionsBase } from "./WorkspaceRootPathFinderOptionsBase";

export type WorkspaceRootPathFinderOptionsSync = (
  & WorkspaceRootPathFinderOptionsBase
  & {
    fs?: Optional<WorkspaceRootPathFinderFSSync>;
  }
);
