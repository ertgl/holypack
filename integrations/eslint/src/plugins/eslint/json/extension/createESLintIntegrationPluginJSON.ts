import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginJSONOptions } from "../options/ESLintIntegrationPluginJSONOptions";

import { ESLintIntegrationPluginJSON } from "./ESLintIntegrationPluginJSON";

export function createESLintIntegrationPluginJSON(
  options?: Optional<ESLintIntegrationPluginJSONOptions>,
): ESLintIntegrationPluginJSON
{
  return new ESLintIntegrationPluginJSON(options);
}
