import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginImportXOptions } from "./ESLintIntegrationPluginImportXOptions";
import type { ESLintIntegrationPluginImportXResolvedOptions } from "./ESLintIntegrationPluginImportXResolvedOptions";

export function resolveESLintIntegrationPluginImportXOptions(
  options?: Optional<ESLintIntegrationPluginImportXOptions>,
): ESLintIntegrationPluginImportXResolvedOptions
{
  options ??= {};

  const internalRegexOptions = options.internalRegex ?? {};

  return {
    internalRegex: {
      extra: internalRegexOptions.extra ?? [],
      overrides: internalRegexOptions.overrides,
    },
  };
}
