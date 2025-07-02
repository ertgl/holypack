import type { Optional } from "../../../../lib/object/Optional";

import type { PackageJSONByFilePathLoaderFSAsync } from "./PackageJSONByFilePathLoaderFSAsync";

export type PackageJSONByFilePathLoaderOptionsAsync = {
  fs?: Optional<PackageJSONByFilePathLoaderFSAsync>;
};
