import { resolveCWD } from "../../../lib/process/cwd/resolveCWD.mjs";

import { resolveBuildContextWorkspacePaths } from "./paths/resolveBuildContextWorkspacePaths.mjs";

/**
 * @import { type BuildContextWorkspace } from "./BuildContextWorkspace.mjs";
 * @import { type BuildContextResolvedWorkspace } from "./BuildContextResolvedWorkspace.mjs";
 */

/**
 * @param {string | null} [cwd]
 * @param {BuildContextWorkspace | null} [workspace]
 * @returns {BuildContextResolvedWorkspace}
 */
export function resolveBuildContextWorkspace(
  cwd,
  workspace,
)
{
  cwd = resolveCWD(cwd);

  workspace ??= {};

  const paths = resolveBuildContextWorkspacePaths(
    cwd,
    workspace.paths,
  );

  return {
    paths,
  };
}
