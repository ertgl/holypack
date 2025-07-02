import { promisify } from "node:util";

import { resolveFileSystemFunctionAsync } from "@holypack/core/lib/fs/resolveFileSystemFunctionAsync";
import type { Path } from "@holypack/core/lib/path/Path";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";
import { findRootPathAsync } from "@holypack/core/lib/path/rooter/findRootPathAsync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "@holypack/core/lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "@holypack/core/lib/process/cwd/resolveCWD";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";

import type { TSConfigRootPathFinderOptionsAsync } from "./TSConfigRootPathFinderOptionsAsync";

export async function findTSConfigRootPathAsync(
  options?: TSConfigRootPathFinderOptionsAsync,
): Promise<null | Path>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const strategy = (
    options.strategy
    ?? ROOT_PATH_FINDER_STRATEGY_INNERMOST
  );

  const lstat = await resolveFileSystemFunctionAsync(
    "lstat",
    options.fs,
  );

  const lstatPromisified = promisify(lstat);

  return await findRootPathAsync(
    cwd,
    async (
      candidatePath: Path,
    ) =>
    {
      const tsconfigFilePath = resolvePath(
        candidatePath,
        "tsconfig.json",
      );

      const stats = await suppressErrorMaybeAsync(
        lstatPromisified,
        tsconfigFilePath,
      );

      return stats?.isFile() ?? false;
    },
    {
      strategy,
    },
  );
}
