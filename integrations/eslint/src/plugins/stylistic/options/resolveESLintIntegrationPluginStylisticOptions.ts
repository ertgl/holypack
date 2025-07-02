import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginStylisticOptions } from "./ESLintIntegrationPluginStylisticOptions";
import type { ESLintIntegrationPluginStylisticResolvedOptions } from "./ESLintIntegrationPluginStylisticResolvedOptions";

export function resolveESLintIntegrationPluginStylisticOptions(
  options?: Optional<ESLintIntegrationPluginStylisticOptions>,
): ESLintIntegrationPluginStylisticResolvedOptions
{
  options ??= {};

  return {
    overrides: options.overrides ?? {},
  };
}
