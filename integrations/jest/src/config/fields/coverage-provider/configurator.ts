import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestCoverageProvider(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.coverageProvider = overrides?.coverageProvider ?? "babel";
}
