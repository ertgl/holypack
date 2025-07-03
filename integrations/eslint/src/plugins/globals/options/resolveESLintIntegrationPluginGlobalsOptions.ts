import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginGlobalsOptions } from "./ESLintIntegrationPluginGlobalsOptions";
import type { ESLintIntegrationPluginGlobalsResolvedOptions } from "./ESLintIntegrationPluginGlobalsResolvedOptions";

export function resolveESLintIntegrationPluginGlobalsOptions(
  options?: Optional<ESLintIntegrationPluginGlobalsOptions>,
): ESLintIntegrationPluginGlobalsResolvedOptions
{
  options ??= {};

  return {};
}
