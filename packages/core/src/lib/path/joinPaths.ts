import { join as superJoinPaths } from "node:path";

import type { Path } from "./Path";
import type { PathLike } from "./PathLike";
import { pathLikeToPath } from "./pathLikeToPath";

export function joinPaths(
  ...segments: PathLike[]
): Path
{
  return superJoinPaths(
    ...segments.map(pathLikeToPath),
  );
}
