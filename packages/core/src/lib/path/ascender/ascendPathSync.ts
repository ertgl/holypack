import { dirname } from "node:path";

import type { Path } from "../Path";
import type { PathLike } from "../PathLike";
import { pathLikeToPath } from "../pathLikeToPath";

import type { PathAscenderPredicateSync } from "./PathAscenderPredicateSync";

export function* ascendPathSync(
  startPath: PathLike,
  predicate: PathAscenderPredicateSync,
): Generator<Path>
{
  const path = pathLikeToPath(startPath);

  let isFileSystemRootReached = false;

  let candidatePath = path;

  while (!isFileSystemRootReached)
  {
    const result = predicate(candidatePath);

    if (result)
    {
      yield candidatePath;
    }

    const parentPath = dirname(candidatePath);

    isFileSystemRootReached = parentPath === candidatePath;
    candidatePath = parentPath;
  }
}
