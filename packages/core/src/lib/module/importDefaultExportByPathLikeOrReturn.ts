import { isPathLike } from "../path/isPathLike";
import type { PathLike } from "../path/PathLike";

import { importDefaultExport } from "./importDefaultExport";
import type { ImportFunction } from "./ImportFunction";

export async function importDefaultExportByPathLikeOrReturn<
  V = unknown,
  T = unknown,
  T_ReturnType = T | V,
>(
  importFunction: ImportFunction<{ default: T }>,
  pathOrValue: PathLike | V,
): Promise<T_ReturnType>
{
  if (isPathLike(pathOrValue))
  {
    return await importDefaultExport(
      importFunction,
      pathOrValue,
    ) as unknown as T_ReturnType;
  }

  return pathOrValue as unknown as T_ReturnType;
}
