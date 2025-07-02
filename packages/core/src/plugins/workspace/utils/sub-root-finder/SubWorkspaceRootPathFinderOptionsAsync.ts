import type { Optional } from "../../../../lib/object/Optional";

import type { SubWorkspaceRootPathFinderFSAsync } from "./SubWorkspaceRootPathFinderFSAsync";
import type { SubWorkspaceRootPathFinderOptionsBase } from "./SubWorkspaceRootPathFinderOptionsBase";

export type SubWorkspaceRootPathFinderOptionsAsync = (
  & SubWorkspaceRootPathFinderOptionsBase
  & {
    fs?: Optional<SubWorkspaceRootPathFinderFSAsync>;
  }
);
