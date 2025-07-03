import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginJSONOptions } from "./ESLintIntegrationPluginJSONOptions";
import type { ESLintIntegrationPluginJSONResolvedOptions } from "./ESLintIntegrationPluginJSONResolvedOptions";

export function resolveESLintIntegrationPluginJSONOptions(
  options?: Optional<ESLintIntegrationPluginJSONOptions>,
): ESLintIntegrationPluginJSONResolvedOptions
{
  options ??= {};

  return {};
}
