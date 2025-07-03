import type { Optional } from "@holypack/core/lib/object/Optional";

import type { JestIntegrationPluginESLintOptions } from "../options/JestIntegrationPluginESLintOptions";

import { JestIntegrationPluginESLint } from "./JestIntegrationPluginESLint";

export function createJestIntegrationPluginESLint(
  options?: Optional<JestIntegrationPluginESLintOptions>,
): JestIntegrationPluginESLint
{
  return new JestIntegrationPluginESLint(options);
}
