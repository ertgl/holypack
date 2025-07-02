import type { Optional } from "../../../../lib/object/Optional";

import type { PackageJSONByFilePathLoaderFSSync } from "./PackageJSONByFilePathLoaderFSSync";

export type PackageJSONByFilePathLoaderOptionsSync = {
  fs?: Optional<PackageJSONByFilePathLoaderFSSync>;
};
