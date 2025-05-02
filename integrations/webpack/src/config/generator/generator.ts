import type { Configuration } from "webpack";

import type { Context } from "@holypack/core";

import { configureWebpackContext } from "../../configurators/context";
import { configureWebpackEntry } from "../../configurators/entry";
import { configureWebpackMode } from "../../configurators/mode";
import { configureWebpackOutput } from "../../configurators/output";
import { createConfigPreset } from "../presets";

import type { WebpackConfigGeneratorOptions } from "./options";

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateWebpackConfig(
  context: Context,
  options?: null | WebpackConfigGeneratorOptions,
): Promise<Configuration>
{
  options ??= {};

  const overrides = options.overrides ?? {};

  // TODO(ertgl): Complete the config generation logic for webpack.
  // TODO(ertgl): Provide custom hooks for the webpack integration.

  const config: Configuration = {};

  const preset = createConfigPreset(
    context,
    overrides,
  );

  configureWebpackContext(
    context,
    config,
    preset,
    overrides,
  );

  configureWebpackEntry(
    context,
    config,
    preset,
    overrides,
  );

  configureWebpackMode(
    context,
    config,
    preset,
    overrides,
  );

  configureWebpackOutput(
    context,
    config,
    preset,
    overrides,
  );

  return config;
}
