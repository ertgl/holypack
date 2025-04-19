import { join as joinPaths } from "node:path";

import type { PathLike } from "../../../fs";
import { convertPathLikeToString } from "../../fs/api";
import type { PackageJSON } from "../package-json";

import { requirePackageJSONByPath } from "./require-package-json-by-path";

export function requirePackageJSONByDirectoryPath(
  directoryPath: PathLike,
): PackageJSON
{
  const directoryPathString = convertPathLikeToString(directoryPath);
  const packageJSONPath = joinPaths(directoryPathString, "package.json");
  return requirePackageJSONByPath(packageJSONPath);
}
