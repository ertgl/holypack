import { resolveFileSystemFunctionSync } from "@holypack/core/lib/fs/resolveFileSystemFunctionSync";
import type { Path } from "@holypack/core/lib/path/Path";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";
import { findRootPathSync } from "@holypack/core/lib/path/rooter/findRootPathSync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "@holypack/core/lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "@holypack/core/lib/process/cwd/resolveCWD";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";

import type { TSConfigRootPathFinderOptionsSync } from "./TSConfigRootPathFinderOptionsSync";

export function findTSConfigRootPathSync(
  options?: TSConfigRootPathFinderOptionsSync,
): null | Path
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const strategy = (
    options.strategy
    ?? ROOT_PATH_FINDER_STRATEGY_INNERMOST
  );

  const lstatSync = resolveFileSystemFunctionSync(
    "lstatSync",
    options.fs,
  );

  return findRootPathSync(
    cwd,
    (
      candidatePath: Path,
    ) =>
    {
      const tsconfigFilePath = resolvePath(
        candidatePath,
        "tsconfig.json",
      );

      const stats = suppressErrorSync(
        lstatSync,
        tsconfigFilePath,
      );

      return stats?.isFile() ?? false;
    },
    {
      strategy,
    },
  );
}
