import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

export type ConfigPresetEnvSettings = {
  isDevelopment: boolean;
  isProduction: boolean;
  mode: "development" | "production";
  name: string;
};

// TODO(ertgl): Create `EnvironmentPlugin` to handle common `process.env` variables.
export function createConfigPresetEnvSettings(
  context: Context,
  overrides?: Configuration | null,
): ConfigPresetEnvSettings
{
  const name = overrides?.name || "development";

  const mode = (
    name === "production"
      ? "production"
      : "development"
  );

  const isProduction = mode === "production";
  const isDevelopment = !isProduction;

  return {
    isDevelopment,
    isProduction,
    mode,
    name,
  };
}
