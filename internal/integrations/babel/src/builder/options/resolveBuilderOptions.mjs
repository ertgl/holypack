import { absolutifyPath } from "@holypack/internal-dev/lib/path/absolutifyPath.mjs";

/**
 * @import { type BuildContext } from "@holypack/internal-dev/build/context/BuildContext.mjs";
 * @import { type BuilderOptions } from "./BuilderOptions.mjs";
 * @import { type BuilderResolvedOptions } from "./BuilderResolvedOptions.mjs";
 */

/**
 * @param {BuildContext} context
 * @param {BuilderOptions | null} [options]
 * @returns {BuilderResolvedOptions}
 */
export function resolveBuilderOptions(
  context,
  options,
)
{
  options ??= {};

  let {
    exclude = undefined,
    format = undefined,
  } = options;

  exclude ??= undefined;

  format ??= "esm";

  const configFilePath = absolutifyPath(
    context.workspace.paths.root,
    (
      options.configFilePath
      ?? `babel.config.${format}.mjs`
    ),
  );

  return {
    configFilePath,
    exclude,
    format,
  };
}
