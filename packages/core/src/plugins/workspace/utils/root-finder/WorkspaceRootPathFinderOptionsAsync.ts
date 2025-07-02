import type { Optional } from "../../../../lib/object/Optional";

import type { WorkspaceRootPathFinderFSAsync } from "./WorkspaceRootPathFinderFSAsync";
import type { WorkspaceRootPathFinderOptionsBase } from "./WorkspaceRootPathFinderOptionsBase";

export type WorkspaceRootPathFinderOptionsAsync = (
  & WorkspaceRootPathFinderOptionsBase
  & {
    fs?: Optional<WorkspaceRootPathFinderFSAsync>;
  }
);
