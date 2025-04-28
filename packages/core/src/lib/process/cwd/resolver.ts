import {
  isAbsolute as isAbsolutePath,
  resolve as resolvePath,
} from "node:path";

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

  const cwdString = convertPathLikeToString(cwd);

  if (!isAbsolutePath(cwdString))
  {
    return resolvePath(
      getProcessCWD(),
      cwdString,
    );
  }

  return cwdString;
}
