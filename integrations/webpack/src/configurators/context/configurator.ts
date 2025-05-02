import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../config/presets";

export function configureWebpackContext(
  context: Context,
  config: Configuration,
  preset: ConfigPreset,
  overrides?: Configuration | null,
): void
{
  config.context = overrides?.context ?? preset.paths.context;
}
