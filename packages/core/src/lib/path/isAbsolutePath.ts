import { isAbsolute as superIsAbsolutePath } from "node:path";

import type { PathLike } from "./PathLike";
import { pathLikeToPath } from "./pathLikeToPath";

export function isAbsolutePath(
  pathLike: PathLike,
): boolean
{
  return superIsAbsolutePath(pathLikeToPath(pathLike));
}
