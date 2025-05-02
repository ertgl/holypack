import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../config/presets";

export function configureWebpackOutput(
  context: Context,
  config: Configuration,
  preset: ConfigPreset,
  overrides?: Configuration | null,
): void
{
  overrides ??= {};

  config.output = {
    ...overrides.output,
    path: overrides.output?.path ?? preset.paths.dist,
  };
}
