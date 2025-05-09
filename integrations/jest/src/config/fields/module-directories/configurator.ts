import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestModuleDirectories(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.moduleDirectories = (
    overrides?.moduleDirectories
    ?? [
      "node_modules",
    ]
  );
}
