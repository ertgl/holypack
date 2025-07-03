import type { Configuration } from "webpack";

import type { WebpackContext } from "../context/WebpackContext";
import type { WebpackIntegrationResolvedOptions } from "../options/WebpackIntegrationResolvedOptions";

import { configureWebpackContext } from "./fields/context/configureWebpackContext";
import { configureWebpackEntry } from "./fields/entry/configureWebpackEntry";
import { configureWebpackMode } from "./fields/mode/configureWebpackMode";
import { configureWebpackOutput } from "./fields/output/configureWebpackOutput";
import type { WebpackConfigurationResolvedOptions } from "./options/WebpackConfigurationResolvedOptions";

export function generateConfiguration(
  webpackContext: WebpackContext,
  webpackIntegrationOptions: WebpackIntegrationResolvedOptions,
  options: WebpackConfigurationResolvedOptions,
): Configuration
{
  const config: Configuration = {
    ...options.overrides,
  };

  configureWebpackContext(
    webpackContext,
    webpackIntegrationOptions,
    config,
    options,
  );

  configureWebpackEntry(
    webpackContext,
    webpackIntegrationOptions,
    config,
    options,
  );

  configureWebpackMode(
    webpackContext,
    webpackIntegrationOptions,
    config,
    options,
  );

  configureWebpackOutput(
    webpackContext,
    webpackIntegrationOptions,
    config,
    options,
  );

  return config;
}
