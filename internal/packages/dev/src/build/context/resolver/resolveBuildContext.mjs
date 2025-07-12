import { resolveCWD } from "../../../lib/process/cwd/resolveCWD.mjs";
import { resolveBuildContextWorkspace } from "../workspace/resolveBuildContextWorkspace.mjs";

/**
 * @import { type BuildContext } from "../BuildContext.mjs";
 * @import { type BuildContextResolutionOptions } from "./BuildContextResolutionOptions.mjs";
 */

/**
 * @param {BuildContextResolutionOptions | null} [options]
 * @returns {BuildContext}
 */
export function resolveBuildContext(
  options,
)
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const workspace = resolveBuildContextWorkspace(
    cwd,
    options.workspace,
  );

  return {
    cwd,
    workspace,
  };
}
