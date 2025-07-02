import type { Context } from "@holypack/core/context/Context";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";

import type { WebpackPaths } from "../WebpackPaths";

export function resolveWebpackPaths(
  context: Context,
  workspace: Workspace,
): WebpackPaths
{
  const srcDirectoryPath = resolvePath(
    workspace.path,
    "src",
  );

  const distDirectoryPath = resolvePath(
    workspace.path,
    "dist",
  );

  return {
    context: workspace.path,
    dist: distDirectoryPath,
    src: srcDirectoryPath,
  };
}
