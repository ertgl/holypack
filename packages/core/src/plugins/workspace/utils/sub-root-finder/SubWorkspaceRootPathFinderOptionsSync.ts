import type { Optional } from "../../../../lib/object/Optional";

import type { SubWorkspaceRootPathFinderFSSync } from "./SubWorkspaceRootPathFinderFSSync";
import type { SubWorkspaceRootPathFinderOptionsBase } from "./SubWorkspaceRootPathFinderOptionsBase";

export type SubWorkspaceRootPathFinderOptionsSync = (
  & SubWorkspaceRootPathFinderOptionsBase
  & {
    fs?: Optional<SubWorkspaceRootPathFinderFSSync>;
  }
);
