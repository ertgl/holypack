import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginGlobalIgnoresOptions } from "./ESLintIntegrationPluginGlobalIgnoresOptions";
import type { ESLintIntegrationPluginGlobalIgnoresResolvedOptions } from "./ESLintIntegrationPluginGlobalIgnoresResolvedOptions";

export function resolveESLintIntegrationPluginGlobalIgnoresOptions(
  options?: Optional<ESLintIntegrationPluginGlobalIgnoresOptions>,
): ESLintIntegrationPluginGlobalIgnoresResolvedOptions
{
  options ??= {};

  return {
    extra: options.extra ?? [],
    overrides: options.overrides,
  };
}
