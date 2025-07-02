import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginPerfectionistOptions } from "./ESLintIntegrationPluginPerfectionistOptions";
import type { ESLintIntegrationPluginPerfectionistResolvedOptions } from "./ESLintIntegrationPluginPerfectionistResolvedOptions";

export function resolveESLintIntegrationPluginPerfectionistOptions(
  options?: Optional<ESLintIntegrationPluginPerfectionistOptions>,
): ESLintIntegrationPluginPerfectionistResolvedOptions
{
  options ??= {};

  const internalPatternOptions = options.internalPattern ?? {};

  return {
    internalPattern: {
      extra: internalPatternOptions.extra ?? [],
      overrides: internalPatternOptions.overrides,
    },
  };
}
