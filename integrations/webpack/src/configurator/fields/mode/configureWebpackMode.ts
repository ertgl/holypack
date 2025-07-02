import type { Configuration } from "webpack";

import type { WebpackContext } from "../../../context/WebpackContext";
import type { WebpackIntegrationResolvedOptions } from "../../../options/WebpackIntegrationResolvedOptions";
import type { WebpackConfigurationResolvedOptions } from "../../options/WebpackConfigurationResolvedOptions";

export function configureWebpackMode(
  webpackContext: WebpackContext,
  webpackIntegrationOptions: WebpackIntegrationResolvedOptions,
  config: Configuration,
  options: WebpackConfigurationResolvedOptions,
): void
{
  config.mode = (
    options.overrides.mode
    ?? webpackContext.env.mode
  );
}
