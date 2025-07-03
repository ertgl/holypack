import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginImportXOptions } from "../options/ESLintIntegrationPluginImportXOptions";

import { ESLintIntegrationPluginImportX } from "./ESLintIntegrationPluginImportX";

export function createESLintIntegrationPluginImportX(
  options?: Optional<ESLintIntegrationPluginImportXOptions>,
): ESLintIntegrationPluginImportX
{
  return new ESLintIntegrationPluginImportX(options);
}
