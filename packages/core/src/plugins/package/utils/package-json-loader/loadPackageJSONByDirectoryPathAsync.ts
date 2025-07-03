import type { Optional } from "../../../../lib/object/Optional";
import type { PathLike } from "../../../../lib/path/PathLike";
import { resolvePath } from "../../../../lib/path/resolvePath";
import type { PackageJSON } from "../../models/PackageJSON";

import { loadPackageJSONByFilePathAsync } from "./loadPackageJSONByFilePathAsync";
import type { PackageJSONByFilePathLoaderOptionsAsync } from "./PackageJSONByFilePathLoaderOptionsAsync";

export async function loadPackageJSONByDirectoryPathAsync(
  packageDirectoryPathLike: PathLike,
  options?: Optional<PackageJSONByFilePathLoaderOptionsAsync>,
): Promise<PackageJSON>
{
  return await loadPackageJSONByFilePathAsync(
    resolvePath(
      packageDirectoryPathLike,
      "package.json",
    ),
    options,
  );
}
