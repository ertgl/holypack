import { getDirentFullPath } from "../../../../lib/fs/dirent/getDirentFullPath";
import { resolveFileSystemFunctionSync } from "../../../../lib/fs/resolveFileSystemFunctionSync";
import type { Optional } from "../../../../lib/object/Optional";
import type { Path } from "../../../../lib/path/Path";
import type { PathLike } from "../../../../lib/path/PathLike";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD";
import { loadPackageJSONByDirectoryPathSync } from "../../../package/utils/package-json-loader/loadPackageJSONByDirectoryPathSync";
import { extractWorkspaceGlobPatterns } from "../../../package/utils/workspace-glob-pattern-extractor/extractWorkspaceGlobPatterns";

import type { SubWorkspaceRootPathFinderOptionsSync } from "./SubWorkspaceRootPathFinderOptionsSync";

export function findSubWorkspaceRootPathsSync(
  workspacePathLike: PathLike,
  options?: Optional<SubWorkspaceRootPathFinderOptionsSync>,
): Path[]
{
  options ??= {};

  const cwd = resolveCWD(workspacePathLike);

  let globPattern = options.globPattern;

  if (globPattern == null)
  {
    const packageJSON = loadPackageJSONByDirectoryPathSync(
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

  const globSync = resolveFileSystemFunctionSync(
    "globSync",
    options.fs,
  );

  const dirents = globSync(
    globPattern,
    {
      cwd,
      withFileTypes: true,
    },
  );

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
