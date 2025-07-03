import type { Configuration } from "webpack";

import type { WebpackContext } from "../../../context/WebpackContext";
import type { WebpackIntegrationResolvedOptions } from "../../../options/WebpackIntegrationResolvedOptions";
import type { WebpackConfigurationResolvedOptions } from "../../options/WebpackConfigurationResolvedOptions";

export function configureWebpackOutput(
  webpackContext: WebpackContext,
  webpackIntegrationOptions: WebpackIntegrationResolvedOptions,
  config: Configuration,
  options: WebpackConfigurationResolvedOptions,
): void
{
  const overrides = options.overrides.output ?? {};

  config.output = {
    ...overrides,
    path: (
      overrides.path
      ?? webpackContext.paths.dist
    ),
  };
}
