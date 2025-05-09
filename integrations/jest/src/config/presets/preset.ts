import type { Config } from "jest";

import type { Context } from "@holypack/core";

import {
  type ConfigPresetEnvSettings,
  createConfigPresetEnvSettings,
} from "./env";
import {
  type ConfigPresetIgnoresSettings,
  createConfigPresetIgnoresSettings,
} from "./ignores";
import {
  type ConfigPresetPathSettings,
  createConfigPresetPathSettings,
} from "./paths";

export type ConfigPreset = {
  env: ConfigPresetEnvSettings;
  ignores: ConfigPresetIgnoresSettings;
  paths: ConfigPresetPathSettings;
};

export function createConfigPreset(
  context: Context,
  overrides?: Config | null,
): ConfigPreset
{
  overrides ??= {};

  return {
    env: createConfigPresetEnvSettings(
      context,
      overrides,
    ),
    ignores: createConfigPresetIgnoresSettings(
      context,
      overrides,
    ),
    paths: createConfigPresetPathSettings(
      context,
      overrides,
    ),
  };
}
