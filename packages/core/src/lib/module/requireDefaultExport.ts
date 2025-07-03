import type { PathLike } from "../path/PathLike";
import { pathLikeToPath } from "../path/pathLikeToPath";

import type { RequireFunction } from "./RequireFunction";

export function requireDefaultExport<
  T = unknown,
  T_ReturnType = T,
>(
  require: RequireFunction<T | { default: T }>,
  pathLike: PathLike,
): T_ReturnType
{
  const path = pathLikeToPath(pathLike);

  const value = require(path) as (
    | Record<string, unknown>
    | T
  );

  if (typeof value === "object" && value && "default" in value)
  {
    return value.default as T_ReturnType;
  }

  return value as unknown as T_ReturnType;
}
