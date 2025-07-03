import { resolveFileSystemFunctionSync } from "../../../../lib/fs/resolveFileSystemFunctionSync";
import type { Optional } from "../../../../lib/object/Optional";
import { absolutifyPath } from "../../../../lib/path/absolutifyPath";
import { globMatch } from "../../../../lib/path/glob/globMatch";
import type { Path } from "../../../../lib/path/Path";
import type { PathLike } from "../../../../lib/path/PathLike";
import { resolvePath } from "../../../../lib/path/resolvePath";
import { findRootPathSync } from "../../../../lib/path/rooter/findRootPathSync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../../../../lib/path/rooter/ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD";
import { loadPackageJSONByFilePathSync } from "../../../package/utils/package-json-loader/loadPackageJSONByFilePathSync";
import { extractWorkspaceGlobPatterns } from "../../../package/utils/workspace-glob-pattern-extractor/extractWorkspaceGlobPatterns";

import type { ParentWorkspaceRootPathFinderOptionsSync } from "./ParentWorkspaceRootPathFinderOptionsSync";

export function findParentWorkspaceRootPathSync(
  workspaceRootPathLike: PathLike,
  options?: ParentWorkspaceRootPathFinderOptionsSync,
): Optional<Path>
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

      const packageJSONFileExists = stats?.isFile() ?? false;

      if (!packageJSONFileExists)
      {
        return false;
      }

      const packageJSON = loadPackageJSONByFilePathSync(
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
