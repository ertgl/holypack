import type { PathLike } from "../../fs";
import { convertPathLikeToString } from "../../path/utils/path-like-converter";

import { getProcessCWD } from "./cwd";

export function resolveCWD(
  cwd?: null | PathLike,
): string
{
  if (!cwd)
  {
    return getProcessCWD();
  }
  return convertPathLikeToString(cwd);
}
