import { dirname } from "node:path";

import {
  findRootPath,
  ROOT_PATH_FINDER_TARGET_INNERMOST,
  type RootPathFinderOptions,
} from "../../../utils/fs/root-path-finder";
import { resolveCWD } from "../../../utils/process/cwd";
import {
  extractWorkspaceGlobPatternsFromPackageJSON,
  matchWorkspaceGlobPatterns,
} from "../../package/utils/fields/workspaces";
import { requirePackageJSONByDirectoryPath } from "../../package/utils/module";

import type { ProjectRootPathFinderOptions } from "./options";

export async function findProjectRootPath(
  options?: null | ProjectRootPathFinderOptions,
): Promise<string>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const rootPathFinderOptions: RootPathFinderOptions = {
    fs: options.fs,
    includeSelf: true,
    target: ROOT_PATH_FINDER_TARGET_INNERMOST,
  };

  const rootPathFinderLookupPaths = [
    "package.json",
  ];

  const nearestRootPath = await findRootPath(
    cwd,
    rootPathFinderLookupPaths,
    rootPathFinderOptions,
  );

  let candidatePath = nearestRootPath;
  let pathToCheck = dirname(nearestRootPath);

  const isCandidatePathFileSystemRoot = candidatePath === pathToCheck;

  if (isCandidatePathFileSystemRoot)
  {
    return candidatePath;
  }

  let possibleCandidatePath = "";

  while (pathToCheck !== possibleCandidatePath)
  {
    possibleCandidatePath = await findRootPath(
      pathToCheck,
      rootPathFinderLookupPaths,
      rootPathFinderOptions,
    );

    const isFileSystemRootOverflowed = possibleCandidatePath === pathToCheck;
    if (isFileSystemRootOverflowed)
    {
      break;
    }

    const upperPackageJSON = requirePackageJSONByDirectoryPath(
      possibleCandidatePath,
    );

    const workspaceGlobPatterns = extractWorkspaceGlobPatternsFromPackageJSON(
      upperPackageJSON,
    );

    const isMatch = matchWorkspaceGlobPatterns(
      possibleCandidatePath,
      candidatePath,
      workspaceGlobPatterns,
    );

    if (isMatch)
    {
      candidatePath = possibleCandidatePath;
    }

    pathToCheck = possibleCandidatePath;
  }

  return candidatePath;
}
