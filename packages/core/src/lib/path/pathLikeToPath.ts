import { fileURLToPath } from "node:url";

import type { Path } from "./Path";
import type { PathLike } from "./PathLike";

export function pathLikeToPath(
  pathLike: PathLike,
): Path
{
  if (typeof pathLike === "string")
  {
    return pathLike;
  }

  if (pathLike instanceof URL)
  {
    return fileURLToPath(pathLike);
  }

  return pathLike.toString();
}
