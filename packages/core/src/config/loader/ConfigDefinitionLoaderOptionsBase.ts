import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";

export type ConfigDefinitionLoaderOptionsBase = {
  cwd?: Optional<PathLike>;
  packageJSONPropertyKeyPath?: Optional<Iterable<string>>;
};
