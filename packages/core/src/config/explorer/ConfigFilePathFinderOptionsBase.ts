import type { Optional } from "../../lib/object/Optional";
import type { PathLike } from "../../lib/path/PathLike";

export type ConfigFilePathFinderOptionsBase = {
  cwd?: Optional<PathLike>;
  filePath?: Optional<PathLike>;
  globPattern?: Optional<string | string[]>;
  packageJSONPropertyKeyPath?: Optional<string[]>;
};
