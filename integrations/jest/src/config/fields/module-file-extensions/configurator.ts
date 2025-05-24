import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestModuleFileExtensions(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.moduleFileExtensions = (
    overrides?.moduleFileExtensions
    ?? [
      "ts",
      "js",
      "mts",
      "mjs",
      "cts",
      "cjs",
      "tsx",
      "jsx",
      "mtsx",
      "mjsx",
      "ctsx",
      "cjsx",
      "json",
      "node",
    ]
  );
}
