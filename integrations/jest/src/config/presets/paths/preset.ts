import type { Config } from "jest";

import type { Context } from "@holypack/core";

export type ConfigPresetPathSettings = {
  root: string;
};

export function createConfigPresetPathSettings(
  context: Context,
  overrides?: Config | null,
): ConfigPresetPathSettings
{
  return {
    root: overrides?.rootDir ?? context.cwd,
  };
}
