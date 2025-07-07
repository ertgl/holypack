import { promisify } from "node:util";

import type { Dirent } from "../../fs/dirent/Dirent";
import { getDirentFullPath } from "../../fs/dirent/getDirentFullPath";
import { resolveFileSystemFunctionAsync } from "../../fs/resolveFileSystemFunctionAsync";
import type { Optional } from "../../object/Optional";
import { resolveCWD } from "../../process/cwd/resolveCWD";
import type { Path } from "../Path";
import { findRootPathAsync } from "../rooter/findRootPathAsync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";

import type { UpwardGlobPathFinderOptionsAsync } from "./UpwardGlobPathFinderOptionsAsync";
import type { UpwardGlobPathFinderResultAsync } from "./UpwardGlobPathFinderResultAsync";

export async function findPathUpwardGlobAsync(
  pattern: string | string[],
  options?: Optional<UpwardGlobPathFinderOptionsAsync>,
): Promise<UpwardGlobPathFinderResultAsync>
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

  const glob = await resolveFileSystemFunctionAsync(
    "glob",
    options.fs,
  );

  const globPromisified = promisify<
    Parameters<typeof glob>[0],
    Parameters<typeof glob>[1],
    Parameters<Parameters<typeof glob>[2]>[1]
  >(glob);

  let path: null | Path = null;

  const rootPath = await findRootPathAsync(
    cwd,
    async (candidatePath) =>
    {
      const dirents = await globPromisified(
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
