import { absolutifyPath } from "../../../../lib/path/absolutifyPath.mjs";
import { resolveCWD } from "../../../../lib/process/cwd/resolveCWD.mjs";

/**
 * @import { type BuildContextResolvedWorkspacePaths } from "./BuildContextResolvedWorkspacePaths.mjs";
 * @import { type BuildContextWorkspacePaths } from "./BuildContextWorkspacePaths.mjs";
 */

/**
 * @param {string | null} [cwd]
 * @param {BuildContextWorkspacePaths | null} [paths]
 * @returns {BuildContextResolvedWorkspacePaths}
 */
export function resolveBuildContextWorkspacePaths(
  cwd,
  paths,
)
{
  cwd = resolveCWD(cwd);

  paths ??= {};

  const dist = absolutifyPath(
    cwd,
    paths.dist ?? "dist",
  );

  const src = absolutifyPath(
    cwd,
    paths.src ?? "src",
  );

  return {
    dist,
    root: cwd,
    src,
  };
}
