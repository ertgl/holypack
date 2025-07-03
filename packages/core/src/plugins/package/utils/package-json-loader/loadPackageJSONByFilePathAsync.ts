import { promisify } from "node:util";

import { decodeJSONSync } from "../../../../lib/codec/decoders/json/decodeJSONSync";
import { resolveFileSystemFunctionAsync } from "../../../../lib/fs/resolveFileSystemFunctionAsync";
import type { Optional } from "../../../../lib/object/Optional";
import type { PathLike } from "../../../../lib/path/PathLike";
import type { PackageJSON } from "../../models/PackageJSON";

import type { PackageJSONByFilePathLoaderOptionsAsync } from "./PackageJSONByFilePathLoaderOptionsAsync";

export async function loadPackageJSONByFilePathAsync(
  packageJSONFilePathLike: PathLike,
  options?: Optional<PackageJSONByFilePathLoaderOptionsAsync>,
): Promise<PackageJSON>
{
  options ??= {};

  const readFile = await resolveFileSystemFunctionAsync(
    "readFile",
    options.fs,
  );

  const readFilePromisified = promisify(readFile);

  const packageJSONFileContent = await readFilePromisified(
    packageJSONFilePathLike,
    "utf8",
  );

  return decodeJSONSync(packageJSONFileContent);
}
