import { promisify } from "node:util";

import type { Dirent } from "../../../../lib/fs/dirent/Dirent";
import { getDirentFullPath } from "../../../../lib/fs/dirent/getDirentFullPath";
import { resolveFileSystemFunctionAsync } from "../../../../lib/fs/resolveFileSystemFunctionAsync";
import type { Optional } from "../../../../lib/object/Optional";
import type { Path } from "../../../../lib/path/Path";
import type { PathLike } from "../../../../lib/path/PathLike";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD";
import { loadPackageJSONByDirectoryPathAsync } from "../../../package/utils/package-json-loader/loadPackageJSONByDirectoryPathAsync";
import { extractWorkspaceGlobPatterns } from "../../../package/utils/workspace-glob-pattern-extractor/extractWorkspaceGlobPatterns";

import type { SubWorkspaceRootPathFinderOptionsAsync } from "./SubWorkspaceRootPathFinderOptionsAsync";

export async function findSubWorkspaceRootPathsAsync(
  workspacePathLike: PathLike,
  options?: Optional<SubWorkspaceRootPathFinderOptionsAsync>,
): Promise<Path[]>
{
  options ??= {};

  const cwd = resolveCWD(workspacePathLike);

  let globPattern = options.globPattern;

  if (globPattern == null)
  {
    const packageJSON = await loadPackageJSONByDirectoryPathAsync(
      cwd,
      {
        fs: options.fs,
      },
    );

    globPattern = extractWorkspaceGlobPatterns(packageJSON);
  }

  if (!globPattern)
  {
    return [];
  }

  if (!Array.isArray(globPattern))
  {
    globPattern = [globPattern];
  }

  const glob = await resolveFileSystemFunctionAsync(
    "glob",
    options.fs,
  );

  const globPromisified = promisify<
    Parameters<typeof glob>[0],
    Parameters<typeof glob>[1],
    Parameters<Parameters<typeof glob>[2]>[1]
  >(glob);

  const dirents = await globPromisified(
    globPattern,
    {
      cwd,
      withFileTypes: true,
    },
  ) as Dirent[];

  return dirents.reduce<Path[]>(
    (
      acc,
      dirent,
    ) =>
    {
      if (dirent.isDirectory())
      {
        acc.push(getDirentFullPath(dirent));
      }

      return acc;
    },
    [],
  );
}
