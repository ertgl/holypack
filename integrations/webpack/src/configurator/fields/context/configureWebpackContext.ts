import type { Configuration } from "webpack";

import type { WebpackContext } from "../../../context/WebpackContext";
import type { WebpackIntegrationResolvedOptions } from "../../../options/WebpackIntegrationResolvedOptions";
import type { WebpackConfigurationResolvedOptions } from "../../options/WebpackConfigurationResolvedOptions";

export function configureWebpackContext(
  webpackContext: WebpackContext,
  webpackIntegrationOptions: WebpackIntegrationResolvedOptions,
  config: Configuration,
  options: WebpackConfigurationResolvedOptions,
): void
{
  config.context = (
    options.overrides.context
    ?? webpackContext.paths.context
  );
}
