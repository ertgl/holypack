import { resolveFileSystemFunctionSync } from "../../../../lib/fs/resolveFileSystemFunctionSync";
import type { Optional } from "../../../../lib/object/Optional";
import type { Path } from "../../../../lib/path/Path";
import { resolvePath } from "../../../../lib/path/resolvePath";
import { findRootPathSync } from "../../../../lib/path/rooter/findRootPathSync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../../../../lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD";

import type { WorkspaceRootPathFinderOptionsSync } from "./WorkspaceRootPathFinderOptionsSync";

export function findWorkspaceRootPathSync(
  options?: WorkspaceRootPathFinderOptionsSync,
): Optional<Path>
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
      const packageJSONFilePath = resolvePath(
        candidatePath,
        "package.json",
      );

      const stats = lstatSync(
        packageJSONFilePath,
        {
          throwIfNoEntry: false,
        },
      );

      return stats?.isFile() ?? false;
    },
    {
      strategy,
    },
  );
}
