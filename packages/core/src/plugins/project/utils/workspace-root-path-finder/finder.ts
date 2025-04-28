import {
  findRootPath,
  ROOT_PATH_FINDER_TARGET_INNERMOST,
  type RootPathFinderOptions,
} from "../../../../lib/fs/utils/root-path-finder";
import { resolveCWD } from "../../../../lib/process/cwd";

import type { WorkspaceRootPathFinderOptions } from "./options";

export async function findWorkspaceRootPath(
  options?: null | WorkspaceRootPathFinderOptions,
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

  return await findRootPath(
    cwd,
    rootPathFinderLookupPaths,
    rootPathFinderOptions,
  );
}
