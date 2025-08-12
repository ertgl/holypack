import type { PathLike } from "../path/PathLike";
import { pathLikeToPath } from "../path/pathLikeToPath";

import type { ExtractDefaultExport } from "./ExtractDefaultExport";
import type { ImportFunction } from "./ImportFunction";

export async function importDefaultExport<
  T = unknown,
  T_Function extends ImportFunction<T> = ImportFunction<T>,
  T_ReturnType extends ExtractDefaultExport<Awaited<ReturnType<T_Function>>> = ExtractDefaultExport<Awaited<ReturnType<T_Function>>>,
>(
  importFunction: T_Function,
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
