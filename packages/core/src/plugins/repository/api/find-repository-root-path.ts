import { resolveCWD } from "../../../process";

export type RepositoryPathFinderOptions = {
  cwd?: null | string;
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function findRepositoryRootPath(
  options?: null | RepositoryPathFinderOptions,
): Promise<string>
{
  options ??= {};

  // TODO(ertgl): Search up the directory tree to find the root path of the repository.
  return resolveCWD(options.cwd);
}
