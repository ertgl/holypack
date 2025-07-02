import { maybeUnwrapSync } from "../monad/maybeUnwrapSync";
import type { MaybeWrapped } from "../monad/MaybeWrapped";
import type { Optional } from "../object/Optional";

import { isAbsolutePath } from "./isAbsolutePath";
import type { Path } from "./Path";
import type { PathLike } from "./PathLike";
import { pathLikeToPath } from "./pathLikeToPath";
import { resolvePath } from "./resolvePath";

export function absolutifyPath(
  cwd: MaybeWrapped<PathLike>,
  pathLike: Optional<PathLike>,
): Path
{
  if (pathLike == null)
  {
    return resolvePath(maybeUnwrapSync(cwd));
  }

  const path = pathLikeToPath(pathLike);

  if (isAbsolutePath(path))
  {
    return path;
  }

  return resolvePath(
    maybeUnwrapSync(cwd),
    path,
  );
}
