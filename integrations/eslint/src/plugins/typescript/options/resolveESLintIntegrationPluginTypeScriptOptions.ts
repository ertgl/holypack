import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginTypeScriptOptions } from "./ESLintIntegrationPluginTypeScriptOptions";
import type { ESLintIntegrationPluginTypeScriptResolvedOptions } from "./ESLintIntegrationPluginTypeScriptResolvedOptions";

export function resolveESLintIntegrationPluginTypeScriptOptions(
  options?: Optional<ESLintIntegrationPluginTypeScriptOptions>,
): ESLintIntegrationPluginTypeScriptResolvedOptions
{
  options ??= {};

  return {
    warnOnUnsupportedTypeScriptVersion: (
      options.warnOnUnsupportedTypeScriptVersion
      ?? false
    ),
  };
}
