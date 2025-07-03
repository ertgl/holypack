import type { SyncHook } from "tapable";
import type { Configuration } from "webpack";

import type { WebpackConfigurationResolvedOptions } from "../../configurator/options/WebpackConfigurationResolvedOptions";
import type { WebpackContext } from "../../context/WebpackContext";
import type { WebpackIntegrationResolvedOptions } from "../../options/WebpackIntegrationResolvedOptions";

export type GenerateConfigurationHookSync = SyncHook<
  [
    webpackContext: WebpackContext,
    webpackIntegrationOptions: WebpackIntegrationResolvedOptions,
    config: Configuration,
    options: WebpackConfigurationResolvedOptions,
  ]
>;
