import { dirname } from "node:path";

import type { Optional } from "../object/Optional";
import { absolutifyPath } from "../path/absolutifyPath";
import { isAbsolutePath } from "../path/isAbsolutePath";
import type { PathLike } from "../path/PathLike";
import { pathLikeToPath } from "../path/pathLikeToPath";
import { RELATIVE_PATH_SPECIFIER_REGEXP } from "../path/RELATIVE_PATH_SPECIFIER_REGEXP";
import { resolveCWD } from "../process/cwd/resolveCWD";

export async function importWithReferrer<
  T = unknown,
>(
  basePathLike: Optional<PathLike>,
  referrerPathLike: Optional<PathLike>,
  modulePathLike: PathLike,
): Promise<T>
{
  const modulePath = pathLikeToPath(modulePathLike);

  if (
    isAbsolutePath(modulePath)
    || !RELATIVE_PATH_SPECIFIER_REGEXP.test(modulePath)
  )
  {
    return await import(
      modulePath,
    ) as T;
  }

  if (referrerPathLike != null)
  {
    const referrerPath = absolutifyPath(
      resolveCWD.bind(null, basePathLike),
      referrerPathLike,
    );

    return await import(
      absolutifyPath(
        dirname.bind(null, referrerPath),
        modulePathLike,
      ),
    ) as T;
  }

  return await import(
    absolutifyPath(
      resolveCWD.bind(null, basePathLike),
      modulePathLike,
    ),
  ) as T;
}
