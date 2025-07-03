import { isPathLike } from "./isPathLike";
import type { Path } from "./Path";
import type { PathLike } from "./PathLike";
import { pathLikeToPath } from "./pathLikeToPath";

export function maybePathLikeToPath<
  T = unknown,
  T_ReturnType extends Exclude<T, PathLike> | Path = Exclude<T, PathLike> | Path,
>(
  value: T,
): T_ReturnType
{
  if (isPathLike(value))
  {
    return pathLikeToPath(value) as T_ReturnType;
  }

  return value as unknown as T_ReturnType;
}
