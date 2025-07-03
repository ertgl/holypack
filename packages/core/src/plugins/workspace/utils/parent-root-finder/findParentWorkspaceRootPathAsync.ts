import { promisify } from "node:util";

import { resolveFileSystemFunctionAsync } from "../../../../lib/fs/resolveFileSystemFunctionAsync";
import type { Optional } from "../../../../lib/object/Optional";
import { absolutifyPath } from "../../../../lib/path/absolutifyPath";
import { globMatch } from "../../../../lib/path/glob/globMatch";
import type { Path } from "../../../../lib/path/Path";
import type { PathLike } from "../../../../lib/path/PathLike";
import { resolvePath } from "../../../../lib/path/resolvePath";
import { findRootPathAsync } from "../../../../lib/path/rooter/findRootPathAsync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../../../../lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD";
import { suppressErrorMaybeAsync } from "../../../../lib/runtime/suppressErrorMaybeAsync";
import { loadPackageJSONByFilePathAsync } from "../../../package/utils/package-json-loader/loadPackageJSONByFilePathAsync";
import { extractWorkspaceGlobPatterns } from "../../../package/utils/workspace-glob-pattern-extractor/extractWorkspaceGlobPatterns";

import type { ParentWorkspaceRootPathFinderOptionsAsync } from "./ParentWorkspaceRootPathFinderOptionsAsync";

export async function findParentWorkspaceRootPathAsync(
  workspaceRootPathLike: PathLike,
  options?: ParentWorkspaceRootPathFinderOptionsAsync,
): Promise<Optional<Path>>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const workspaceRootPath = absolutifyPath(
    cwd,
    workspaceRootPathLike,
  );

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

      const packageJSONFileExists = stats?.isFile() ?? false;

      if (!packageJSONFileExists)
      {
        return false;
      }

      const packageJSON = await loadPackageJSONByFilePathAsync(
        packageJSONFilePath,
        {
          fs: options.fs,
        },
      );

      const workspaceGlobPatterns = extractWorkspaceGlobPatterns(packageJSON);

      return globMatch(
        workspaceGlobPatterns,
        workspaceRootPath,
        {
          cwd: candidatePath,
        },
      );
    },
    {
      strategy,
    },
  );
}
