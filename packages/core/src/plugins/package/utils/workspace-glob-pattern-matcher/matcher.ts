import type { PathLike } from "../../../../fs";
import { globMatch } from "../../../../lib/path/glob";

export function matchWorkspaceGlobPatterns(
  cwd: PathLike,
  path: string,
  patterns: string[],
): boolean
{
  return globMatch(
    cwd,
    path,
    patterns,
  );
}
