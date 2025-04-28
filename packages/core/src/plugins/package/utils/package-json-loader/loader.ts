// #[cjs(remove)]
import { createRequire } from "node:module";
import { join as joinPaths } from "node:path";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type { PathLike } from "../../../../lib/fs";
import { convertPathLikeToString } from "../../../../lib/path/utils/path-like-converter";
import type { PackageJSON } from "../../package-json";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

// TODO(ertgl): Use JSON file loader (with custom FS support) instead of `require` to load package.json files.
export function requirePackageJSONByDirectoryPath(
  directoryPath: PathLike,
): PackageJSON
{
  const directoryPathString = convertPathLikeToString(directoryPath);
  const packageJSONPath = joinPaths(directoryPathString, "package.json");
  return requirePackageJSONByPath(packageJSONPath);
}

// TODO(ertgl): Use JSON file loader (with custom FS support) instead of `require` to load package.json files.
export function requirePackageJSONByPath(
  packageJSONPath: PathLike,
): PackageJSON
{
  const packageJSONPathString = convertPathLikeToString(packageJSONPath);
  const packageJSON = require(packageJSONPathString) as Record<string, unknown>;
  return packageJSON;
}
