import { promisify } from "node:util";

import { resolveFileSystemFunctionAsync } from "../../../../lib/fs/resolveFileSystemFunctionAsync";
import type { Optional } from "../../../../lib/object/Optional";
import type { Path } from "../../../../lib/path/Path";
import { resolvePath } from "../../../../lib/path/resolvePath";
import { findRootPathAsync } from "../../../../lib/path/rooter/findRootPathAsync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../../../../lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD";
import { suppressErrorMaybeAsync } from "../../../../lib/runtime/suppressErrorMaybeAsync";

import type { WorkspaceRootPathFinderOptionsAsync } from "./WorkspaceRootPathFinderOptionsAsync";

export async function findWorkspaceRootPathAsync(
  options?: WorkspaceRootPathFinderOptionsAsync,
): Promise<Optional<Path>>
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
      const packageJSONFilePath = resolvePath(
        candidatePath,
        "package.json",
      );

      const stats = await suppressErrorMaybeAsync(
        lstatPromisified,
        packageJSONFilePath,
      );

      return stats?.isFile() ?? false;
    },
    {
      strategy,
    },
  );
}
