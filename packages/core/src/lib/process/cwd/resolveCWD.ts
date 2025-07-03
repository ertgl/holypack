import type { Optional } from "../../object/Optional";
import { absolutifyPath } from "../../path/absolutifyPath";
import type { Path } from "../../path/Path";
import type { PathLike } from "../../path/PathLike";

import { getCWD } from "./getCWD";

export function resolveCWD(
  pathLike?: Optional<PathLike>,
): Path
{
  return (
    pathLike == null
      ? getCWD()
      : absolutifyPath(
          getCWD,
          pathLike,
        )
  );
}
