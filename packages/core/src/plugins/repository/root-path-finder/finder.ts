import {
  findRootPath,
  ROOT_PATH_FINDER_TARGET_OUTERMOST,
} from "../../../utils/fs/root-path-finder";
import { resolveCWD } from "../../../utils/process/cwd";

import type { RepositoryRootPathFinderOptions } from "./options";

export async function findRepositoryRootPath(
  options?: null | RepositoryRootPathFinderOptions,
): Promise<string>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const rootPath = findRootPath(
    cwd,
    [
      ".git",
      "package.json",
    ],
    {
      fs: options.fs,
      target: ROOT_PATH_FINDER_TARGET_OUTERMOST,
    },
  );

  return rootPath;
}
