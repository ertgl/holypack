import { isPathLike } from "../path/isPathLike";
import type { PathLike } from "../path/PathLike";

import { requireDefaultExport } from "./requireDefaultExport";
import type { RequireFunction } from "./RequireFunction";

export function requireDefaultExportByPathLikeOrReturn<
  V = unknown,
  T = unknown,
  T_ReturnType = T | V,
>(
  require: RequireFunction<T | { default: T }>,
  pathOrValue: PathLike | V,
): T_ReturnType
{
  if (isPathLike(pathOrValue))
  {
    return requireDefaultExport<
      T,
      T_ReturnType
    >(
      require,
      pathOrValue,
    );
  }

  return pathOrValue as unknown as T_ReturnType;
}
