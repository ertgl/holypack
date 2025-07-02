import { dirname } from "node:path";

import { maybeAwait } from "../../promise/maybeAwait";
import type { Path } from "../Path";
import type { PathLike } from "../PathLike";
import { pathLikeToPath } from "../pathLikeToPath";

import type { PathAscenderPredicateMaybeAsync } from "./PathAscenderPredicateMaybeAsync";

export async function* ascendPathAsync(
  startPath: PathLike,
  predicate: PathAscenderPredicateMaybeAsync,
): AsyncGenerator<Path>
{
  const path = pathLikeToPath(startPath);

  let isFileSystemRootReached = false;

  let candidatePath = path;

  while (!isFileSystemRootReached)
  {
    const result = await maybeAwait(predicate(candidatePath));

    if (result)
    {
      yield candidatePath;
    }

    const parentPath = dirname(candidatePath);

    isFileSystemRootReached = parentPath === candidatePath;
    candidatePath = parentPath;
  }
}
