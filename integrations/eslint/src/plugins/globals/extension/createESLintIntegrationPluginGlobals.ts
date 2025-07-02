import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginGlobalsOptions } from "../options/ESLintIntegrationPluginGlobalsOptions";

import { ESLintIntegrationPluginGlobals } from "./ESLintIntegrationPluginGlobals";

export function createESLintIntegrationPluginGlobals(
  options?: Optional<ESLintIntegrationPluginGlobalsOptions>,
): ESLintIntegrationPluginGlobals
{
  return new ESLintIntegrationPluginGlobals(options);
}
