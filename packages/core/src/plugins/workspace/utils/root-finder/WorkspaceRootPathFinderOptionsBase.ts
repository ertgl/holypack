import type { Optional } from "../../../../lib/object/Optional";
import type { PathLike } from "../../../../lib/path/PathLike";
import type { RootPathFinderStrategy } from "../../../../lib/path/rooter/RootPathFinderStrategy";

export type WorkspaceRootPathFinderOptionsBase = {
  cwd?: Optional<PathLike>;
  strategy?: Optional<RootPathFinderStrategy>;
};
