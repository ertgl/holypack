import { joinPaths } from "../../path/joinPaths";
import type { Path } from "../../path/Path";

import type { AnyDirent } from "./AnyDirent";

export function getDirentFullPath(
  dirent: AnyDirent,
): Path
{
  return joinPaths(
    dirent.parentPath,
    dirent.name,
  );
}
