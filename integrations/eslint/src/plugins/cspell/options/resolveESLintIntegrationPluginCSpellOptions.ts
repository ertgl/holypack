import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginCSpellOptions } from "./ESLintIntegrationPluginCSpellOptions";
import type { ESLintIntegrationPluginCSpellResolvedOptions } from "./ESLintIntegrationPluginCSpellResolvedOptions";

export function resolveESLintIntegrationPluginCSpellOptions(
  options?: Optional<ESLintIntegrationPluginCSpellOptions>,
): ESLintIntegrationPluginCSpellResolvedOptions
{
  options ??= {};

  return {
    overrides: options.overrides ?? {},
  };
}
