import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import {
  type ConfigPresetEnvSettings,
  createConfigPresetEnvSettings,
} from "./env";
import {
  type ConfigPresetPathSettings,
  createConfigPresetPathSettings,
} from "./paths";

export type ConfigPreset = {
  env: ConfigPresetEnvSettings;
  paths: ConfigPresetPathSettings;
};

export function createConfigPreset(
  context: Context,
  overrides?: Configuration | null,
): ConfigPreset
{
  overrides ??= {};

  return {
    env: createConfigPresetEnvSettings(
      context,
      overrides,
    ),
    paths: createConfigPresetPathSettings(
      context,
      overrides,
    ),
  };
}
