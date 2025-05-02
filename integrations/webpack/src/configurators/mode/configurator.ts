import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../config/presets";

export function configureWebpackMode(
  context: Context,
  config: Configuration,
  preset: ConfigPreset,
  overrides?: Configuration | null,
): void
{
  config.mode = overrides?.mode ?? preset.env.mode;
}
