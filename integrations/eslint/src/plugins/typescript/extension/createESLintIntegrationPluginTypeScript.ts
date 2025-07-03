import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginTypeScriptOptions } from "../options/ESLintIntegrationPluginTypeScriptOptions";

import { ESLintIntegrationPluginTypeScript } from "./ESLintIntegrationPluginTypeScript";

export function createESLintIntegrationPluginTypeScript(
  options?: Optional<ESLintIntegrationPluginTypeScriptOptions>,
): ESLintIntegrationPluginTypeScript
{
  return new ESLintIntegrationPluginTypeScript(options);
}
