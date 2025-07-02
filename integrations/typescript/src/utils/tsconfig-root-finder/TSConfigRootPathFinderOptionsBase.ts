import type { Optional } from "@holypack/core/lib/object/Optional";
import type { PathLike } from "@holypack/core/lib/path/PathLike";
import type { RootPathFinderStrategy } from "@holypack/core/lib/path/rooter/RootPathFinderStrategy";

export type TSConfigRootPathFinderOptionsBase = {
  cwd?: Optional<PathLike>;
  strategy?: Optional<RootPathFinderStrategy>;
};
