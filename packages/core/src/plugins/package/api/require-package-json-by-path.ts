import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import type { PathLike } from "../../../fs";
import { convertPathLikeToString } from "../../fs/api";
import type { PackageJSON } from "../package-json";

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

export function requirePackageJSONByPath(
  packageJSONPath: PathLike,
): PackageJSON
{
  const packageJSONPathString = convertPathLikeToString(packageJSONPath);
  const packageJSON = require(packageJSONPathString) as Record<string, unknown>;
  return packageJSON;
}
