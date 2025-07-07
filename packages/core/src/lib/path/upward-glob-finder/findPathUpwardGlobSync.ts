import type { Dirent } from "../../fs/dirent/Dirent";
import { getDirentFullPath } from "../../fs/dirent/getDirentFullPath";
import { resolveFileSystemFunctionSync } from "../../fs/resolveFileSystemFunctionSync";
import type { Optional } from "../../object/Optional";
import { resolveCWD } from "../../process/cwd/resolveCWD";
import type { Path } from "../Path";
import { findRootPathSync } from "../rooter/findRootPathSync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";

import type { UpwardGlobPathFinderOptionsSync } from "./UpwardGlobPathFinderOptionsSync";
import type { UpwardGlobPathFinderResultSync } from "./UpwardGlobPathFinderResultSync";

export function findPathUpwardGlobSync(
  pattern: string | string[],
  options?: Optional<UpwardGlobPathFinderOptionsSync>,
): UpwardGlobPathFinderResultSync
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const fileOnly = options.fileOnly ?? false;
  const directoryOnly = options.directoryOnly ?? false;

  const strategy = (
    options.strategy
    ?? ROOT_PATH_FINDER_STRATEGY_INNERMOST
  );

  const patterns = (
    Array.isArray(pattern)
      ? pattern
      : [pattern]
  );

  const globSync = resolveFileSystemFunctionSync(
    "globSync",
    options.fs,
  );

  let path: null | Path = null;

  const rootPath = findRootPathSync(
    cwd,
    (candidatePath) =>
    {
      const dirents = globSync(
        patterns,
        {
          cwd: candidatePath,
          withFileTypes: true,
        },
      ) as Dirent[];

      for (const dirent of dirents)
      {
        if (fileOnly && !dirent.isFile())
        {
          continue;
        }

        if (directoryOnly && !dirent.isDirectory())
        {
          continue;
        }

        path = getDirentFullPath(dirent);

        return true;
      }

      return false;
    },
    {
      strategy,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (path)
  {
    return {
      found: true,
      path,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rootPath: rootPath!,
    };
  }

  return {
    found: false,
    path: null,
    rootPath: null,
  };
}
