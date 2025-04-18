import type { PathLike } from "node:fs";
import {
  dirname,
  join as joinPaths,
} from "node:path";

import { convertPathLikeToString } from "./convert-path-like-to-string";
import { checkIfPathExists, type PathExistenceCheckerFS } from "./path-existence-checker";

export enum RootPathFinderTarget
{
  Innermost = "innermost",
  Outermost = "outermost",
}

export type RootPathFinderFS = (
  & PathExistenceCheckerFS
);

export const ROOT_PATH_FINDER_TARGET_INNERMOST = RootPathFinderTarget.Innermost;

export const ROOT_PATH_FINDER_TARGET_OUTERMOST = RootPathFinderTarget.Outermost;

export const ROOT_PATH_FINDER_TARGET_DEFAULT = ROOT_PATH_FINDER_TARGET_INNERMOST;

export type RootPathFinderOptions = {
  accessMode?: null | number;
  fs?: null | RootPathFinderFS;
  includeSelf?: boolean | null;
  target?: null | RootPathFinderTarget;
};

export const ROOT_PATH_FINDER_INCLUDE_SELF_DEFAULT = true;

export async function findRootPath(
  cwd: PathLike,
  lookupPaths: string[],
  options?: null | RootPathFinderOptions,
): Promise<string>
{
  const cwdString = convertPathLikeToString(cwd);

  if (lookupPaths.length === 0)
  {
    return cwdString;
  }

  const cwdParentPath = dirname(cwdString);
  const isCWDFileSystemRoot = cwdParentPath === cwdString;

  if (isCWDFileSystemRoot)
  {
    return cwdString;
  }

  options ??= {};

  const includeSelf = (
    options.includeSelf
    ?? ROOT_PATH_FINDER_INCLUDE_SELF_DEFAULT
  );

  const target = (
    options.target
    ?? ROOT_PATH_FINDER_TARGET_DEFAULT
  );

  let rootPath = (
    includeSelf
      ? cwdString
      : cwdParentPath
  );

  let candidatePath = cwdString;
  let isFileSystemRootReached = false;
  let isFileSystemRootOverflowed = false;

  while (!isFileSystemRootOverflowed)
  {
    same_directory_lookup:
    for (const lookupPath of lookupPaths)
    {
      const fullLookupPath = joinPaths(rootPath, lookupPath);
      const fullLookupPathExists = await checkIfPathExists(
        fullLookupPath,
        {
          accessMode: options.accessMode,
          fs: options.fs,
        },
      );

      if (fullLookupPathExists)
      {
        candidatePath = dirname(fullLookupPath);

        if (target === ROOT_PATH_FINDER_TARGET_INNERMOST)
        {
          return candidatePath;
        }

        break same_directory_lookup;
      }
    }

    const nextRootPath = dirname(rootPath);
    const wasFileSystemRootReached = isFileSystemRootReached;
    isFileSystemRootReached = nextRootPath === rootPath;
    isFileSystemRootOverflowed = wasFileSystemRootReached;
    rootPath = nextRootPath;
  }

  return candidatePath;
}
