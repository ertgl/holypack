import type { Optional } from "../../../../lib/object/Optional";
import type { PathLike } from "../../../../lib/path/PathLike";
import type { RootPathFinderStrategy } from "../../../../lib/path/rooter/RootPathFinderStrategy";

export type ParentWorkspaceRootPathFinderOptionsBase = {
  cwd?: Optional<PathLike>;
  strategy?: Optional<RootPathFinderStrategy>;
};
