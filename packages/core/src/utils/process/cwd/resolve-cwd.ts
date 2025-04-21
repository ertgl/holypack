import type { PathLike } from "../../../fs";
import { convertPathLikeToString } from "../../path";

import { getProcessCWD } from "./get-process-cwd";

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
