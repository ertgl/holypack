import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginJSDocOptions } from "../options/ESLintIntegrationPluginJSDocOptions";

import { ESLintIntegrationPluginJSDoc } from "./ESLintIntegrationPluginJSDoc";

export function createESLintIntegrationPluginJSDoc(
  options?: Optional<ESLintIntegrationPluginJSDocOptions>,
): ESLintIntegrationPluginJSDoc
{
  return new ESLintIntegrationPluginJSDoc(options);
}
