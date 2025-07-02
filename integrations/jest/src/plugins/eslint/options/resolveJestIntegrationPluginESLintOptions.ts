import type { Optional } from "@holypack/core/lib/object/Optional";

import type { JestIntegrationPluginESLintOptions } from "./JestIntegrationPluginESLintOptions";
import type { JestIntegrationPluginESLintResolvedOptions } from "./JestIntegrationPluginESLintResolvedOptions";

export function resolveJestIntegrationPluginESLintOptions(
  options?: Optional<JestIntegrationPluginESLintOptions>,
): JestIntegrationPluginESLintResolvedOptions
{
  options ??= {};

  return {};
}
