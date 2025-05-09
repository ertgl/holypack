import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestCoveragePathIgnorePatterns(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  // TODO(ertgl): Create `IgnoresPlugin` and collect ignored/output file paths from all plugins/integrations automatically.

  config.coveragePathIgnorePatterns = (
    overrides?.coveragePathIgnorePatterns
    ?? [
      ...preset.ignores.patterns,
    ]
  );
}
