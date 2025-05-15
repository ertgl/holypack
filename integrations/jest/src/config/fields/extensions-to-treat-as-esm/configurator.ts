import type { Config } from "jest";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../presets";

export function configureJestExtensionsToTreatAsEsm(
  context: Context,
  config: Config,
  preset: ConfigPreset,
  overrides?: Config | null,
): void
{
  config.extensionsToTreatAsEsm = (
    overrides?.extensionsToTreatAsEsm
    ?? [
      ".ts",
      ".mts",
      ".tsx",
      ".jsx",
      ".mtsx",
      ".mjsx",
    ]
  );
}
