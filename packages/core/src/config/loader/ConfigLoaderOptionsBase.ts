import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";

export type ConfigLoaderOptionsBase = {
  cwd?: Optional<PathLike>;
};
