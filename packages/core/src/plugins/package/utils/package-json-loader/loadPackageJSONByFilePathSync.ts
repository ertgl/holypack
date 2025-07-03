import { decodeJSONSync } from "../../../../lib/codec/decoders/json/decodeJSONSync";
import { resolveFileSystemFunctionSync } from "../../../../lib/fs/resolveFileSystemFunctionSync";
import type { Optional } from "../../../../lib/object/Optional";
import type { PathLike } from "../../../../lib/path/PathLike";
import type { PackageJSON } from "../../models/PackageJSON";

import type { PackageJSONByFilePathLoaderOptionsSync } from "./PackageJSONByFilePathLoaderOptionsSync";

export function loadPackageJSONByFilePathSync(
  packageJSONFilePathLike: PathLike,
  options?: Optional<PackageJSONByFilePathLoaderOptionsSync>,
): PackageJSON
{
  options ??= {};

  const readFileSync = resolveFileSystemFunctionSync(
    "readFileSync",
    options.fs,
  );

  const packageJSONFileContent = readFileSync(
    packageJSONFilePathLike,
    "utf8",
  );

  return decodeJSONSync(packageJSONFileContent);
}
