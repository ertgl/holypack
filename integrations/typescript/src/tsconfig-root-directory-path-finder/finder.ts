import {
  findRootPath,
  ROOT_PATH_FINDER_TARGET_INNERMOST,
  type RootPathFinderOptions,
} from "@holypack/core/lib/fs/utils/root-path-finder";
import { resolveCWD } from "@holypack/core/lib/process/cwd";

import type { TSConfigRootDirectoryPathFinderOptions } from "./options";

export async function findTSConfigRootDirectoryPath(
  options?: null | TSConfigRootDirectoryPathFinderOptions,
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
    "tsconfig.json",
  ];

  return await findRootPath(
    cwd,
    rootPathFinderLookupPaths,
    rootPathFinderOptions,
  );
}
