import { resolve as resolvePath } from "node:path";

import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

export type ConfigPresetPathSettings = {
  context: string;
  dist: string;
  src: string;
};

export function createConfigPresetPathSettings(
  context: Context,
  overrides?: Configuration | null,
): ConfigPresetPathSettings
{
  const contextDirectoryPath = (
    overrides?.context
    ?? context.cwd
  );

  // TODO(ertgl): Extract overridden `src` directory path from the `entry` property of the webpack config.
  const src = resolvePath(contextDirectoryPath, "src");

  const dist = (
    overrides?.output?.path
    ?? resolvePath(contextDirectoryPath, "dist")
  );

  return {
    context: contextDirectoryPath,
    dist,
    src,
  };
}
