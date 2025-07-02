import type { Optional } from "../../../../lib/object/Optional";

import type { ParentWorkspaceRootPathFinderFSAsync } from "./ParentWorkspaceRootPathFinderFSAsync";
import type { ParentWorkspaceRootPathFinderOptionsBase } from "./ParentWorkspaceRootPathFinderOptionsBase";

export type ParentWorkspaceRootPathFinderOptionsAsync = (
  & ParentWorkspaceRootPathFinderOptionsBase
  & {
    fs?: Optional<ParentWorkspaceRootPathFinderFSAsync>;
  }
);
