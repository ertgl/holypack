import type { Configuration } from "webpack";

import { resolvePath } from "@holypack/core/lib/path/resolvePath";

import type { WebpackContext } from "../../../context/WebpackContext";
import type { WebpackIntegrationResolvedOptions } from "../../../options/WebpackIntegrationResolvedOptions";
import type { WebpackConfigurationResolvedOptions } from "../../options/WebpackConfigurationResolvedOptions";

export function configureWebpackEntry(
  webpackContext: WebpackContext,
  webpackIntegrationOptions: WebpackIntegrationResolvedOptions,
  config: Configuration,
  options: WebpackConfigurationResolvedOptions,
): void
{
  config.entry = (
    options.overrides.entry
    ?? {
      main: {
        import: resolvePath(
          webpackContext.paths.src,
          "main.js",
        ),
      },
    }
  );
}
