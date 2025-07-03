import type { Path } from "../../lib/path/Path";

export type ConfigFilePathFinderResultFoundBase = {
  found: true;
  path: Path;
  rootPath: Path;
}
;
