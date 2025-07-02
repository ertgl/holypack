import type { PathLike } from "../path/PathLike";
import { pathLikeToPath } from "../path/pathLikeToPath";

import type { ImportFunction } from "./ImportFunction";

export async function importDefaultExport<
  T = unknown,
  T_ReturnType = T,
>(
  importFunction: ImportFunction<T | { default: T }>,
  pathLike: PathLike,
): Promise<T_ReturnType>
{
  const path = pathLikeToPath(pathLike);

  const module = await importFunction(
    path,
  ) as (
    | Record<string, unknown>
    | T
  );

  if (typeof module === "object" && module && "default" in module)
  {
    return module.default as T_ReturnType;
  }

  return module as unknown as T_ReturnType;
}
