import { createRequire } from "node:module";
import { join as joinPaths } from "node:path";
import { fileURLToPath } from "node:url";

import type { PathLike } from "../../../../fs";
import { convertPathLikeToString } from "../../../../utils/path";
import type { PackageJSON } from "../../package-json";

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

export function requirePackageJSONByDirectoryPath(
  directoryPath: PathLike,
): PackageJSON
{
  const directoryPathString = convertPathLikeToString(directoryPath);
  const packageJSONPath = joinPaths(directoryPathString, "package.json");
  return requirePackageJSONByPath(packageJSONPath);
}

export function requirePackageJSONByPath(
  packageJSONPath: PathLike,
): PackageJSON
{
  const packageJSONPathString = convertPathLikeToString(packageJSONPath);
  const packageJSON = require(packageJSONPathString) as Record<string, unknown>;
  return packageJSON;
}
