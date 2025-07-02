// #[cjs(remove)]
import { createRequire } from "node:module";
import { dirname } from "node:path";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type { Optional } from "../object/Optional";
import { absolutifyPath } from "../path/absolutifyPath";
import { isAbsolutePath } from "../path/isAbsolutePath";
import type { PathLike } from "../path/PathLike";
import { pathLikeToPath } from "../path/pathLikeToPath";
import { RELATIVE_PATH_SPECIFIER_REGEXP } from "../path/RELATIVE_PATH_SPECIFIER_REGEXP";
import { resolveCWD } from "../process/cwd/resolveCWD";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function requireWithReferrer<
  T = unknown,
>(
  basePathLike: Optional<PathLike>,
  referrerPathLike: Optional<PathLike>,
  modulePathLike: PathLike,
): T
{
  const modulePath = pathLikeToPath(modulePathLike);

  if (
    isAbsolutePath(modulePath)
    || !RELATIVE_PATH_SPECIFIER_REGEXP.test(modulePath)
  )
  {
    return require(modulePath) as T;
  }

  if (referrerPathLike != null)
  {
    const referrerPath = absolutifyPath(
      resolveCWD.bind(null, basePathLike),
      referrerPathLike,
    );

    return require(
      absolutifyPath(
        dirname.bind(null, referrerPath),
        modulePathLike,
      ),
    ) as T;
  }

  return require(
    absolutifyPath(
      resolveCWD.bind(null, basePathLike),
      modulePathLike,
    ),
  ) as T;
}
