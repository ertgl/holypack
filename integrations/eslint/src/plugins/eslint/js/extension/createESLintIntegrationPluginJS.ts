import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginJSOptions } from "../options/ESLintIntegrationPluginJSOptions";

import { ESLintIntegrationPluginJS } from "./ESLintIntegrationPluginJS";

export function createESLintIntegrationPluginJS(
  options?: Optional<ESLintIntegrationPluginJSOptions>,
): ESLintIntegrationPluginJS
{
  return new ESLintIntegrationPluginJS(options);
}
