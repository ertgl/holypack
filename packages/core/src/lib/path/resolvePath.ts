import { resolve as superResolvePath } from "node:path";

import type { Path } from "./Path";
import type { PathLike } from "./PathLike";
import { pathLikeToPath } from "./pathLikeToPath";

export function resolvePath(
  ...segments: PathLike[]
): Path
{
  return superResolvePath(
    ...segments.map(pathLikeToPath),
  );
}
