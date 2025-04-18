import { resolveCWD } from "../../cwd";
import { findRootPath, ROOT_PATH_FINDER_TARGET_OUTERMOST, type RootPathFinderFS } from "../../fs";

export type RepositoryPathFinderFS = (
  & RootPathFinderFS
);

export type RepositoryPathFinderOptions = {
  cwd?: null | string;
  fs?: null | RepositoryPathFinderFS;
};

export async function findRepositoryRootPath(
  options?: null | RepositoryPathFinderOptions,
): Promise<string>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);
  const rootPath = findRootPath(
    cwd,
    [
      "package.json",
    ],
    {
      fs: options.fs,
      target: ROOT_PATH_FINDER_TARGET_OUTERMOST,
    },
  );

  return rootPath;
}
