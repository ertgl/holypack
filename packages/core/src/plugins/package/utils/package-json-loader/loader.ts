// #[cfg(esm) ?? __NODE_PATH__.remove()]
import { createRequire } from "node:module";
import { join as joinPaths } from "node:path";
// #[cfg(esm) ?? __NODE_PATH__.remove()]
import { fileURLToPath } from "node:url";

import type { PathLike } from "../../../../lib/fs";
import { convertPathLikeToString } from "../../../../lib/path/utils/path-like-converter";
import type { PackageJSON } from "../../package-json";

// #[cfg(esm) ?? __NODE_PATH__.remove()]
const __filename = fileURLToPath(import.meta.url);

// #[cfg(esm) ?? __NODE_PATH__.remove()]
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
