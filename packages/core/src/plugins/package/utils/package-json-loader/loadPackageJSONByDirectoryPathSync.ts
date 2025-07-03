import type { Optional } from "../../../../lib/object/Optional";
import type { PathLike } from "../../../../lib/path/PathLike";
import { resolvePath } from "../../../../lib/path/resolvePath";
import type { PackageJSON } from "../../models/PackageJSON";

import { loadPackageJSONByFilePathSync } from "./loadPackageJSONByFilePathSync";
import type { PackageJSONByFilePathLoaderOptionsSync } from "./PackageJSONByFilePathLoaderOptionsSync";

export function loadPackageJSONByDirectoryPathSync(
  packageDirectoryPathLike: PathLike,
  options?: Optional<PackageJSONByFilePathLoaderOptionsSync>,
): PackageJSON
{
  return loadPackageJSONByFilePathSync(
    resolvePath(
      packageDirectoryPathLike,
      "package.json",
    ),
    options,
  );
}
