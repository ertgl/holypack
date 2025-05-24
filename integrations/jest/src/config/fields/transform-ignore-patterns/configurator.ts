import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestTransformIgnorePatterns(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.transformIgnorePatterns = (
    overrides?.transformIgnorePatterns
    ?? [
      ...preset.ignores.patterns,
    ]
  );
}
