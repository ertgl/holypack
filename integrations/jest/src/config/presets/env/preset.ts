import type { Config } from "jest";

import type { Context } from "@holypack/core";

export type ConfigPresetEnvSettings = {
  ci: boolean;
};

export function createConfigPresetEnvSettings(
  context: Context,
  overrides?: Config | null,
): ConfigPresetEnvSettings
{
  return {
    ci: overrides?.ci ?? context.ci.isEnabled,
  };
}
