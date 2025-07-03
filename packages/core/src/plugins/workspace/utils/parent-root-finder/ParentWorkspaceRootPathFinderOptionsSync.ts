import type { Optional } from "../../../../lib/object/Optional";

import type { ParentWorkspaceRootPathFinderFSSync } from "./ParentWorkspaceRootPathFinderFSSync";
import type { ParentWorkspaceRootPathFinderOptionsBase } from "./ParentWorkspaceRootPathFinderOptionsBase";

export type ParentWorkspaceRootPathFinderOptionsSync = (
  & ParentWorkspaceRootPathFinderOptionsBase
  & {
    fs?: Optional<ParentWorkspaceRootPathFinderFSSync>;
  }
);
