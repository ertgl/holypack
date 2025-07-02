import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginGlobalIgnoresOptions } from "../options/ESLintIntegrationPluginGlobalIgnoresOptions";

import { ESLintIntegrationPluginGlobalIgnores } from "./ESLintIntegrationPluginGlobalIgnores";

export function createESLintIntegrationPluginGlobalIgnores(
  options?: Optional<ESLintIntegrationPluginGlobalIgnoresOptions>,
): ESLintIntegrationPluginGlobalIgnores
{
  return new ESLintIntegrationPluginGlobalIgnores(options);
}
