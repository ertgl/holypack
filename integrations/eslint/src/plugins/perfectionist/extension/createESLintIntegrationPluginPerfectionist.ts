import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginPerfectionistOptions } from "../options/ESLintIntegrationPluginPerfectionistOptions";

import { ESLintIntegrationPluginPerfectionist } from "./ESLintIntegrationPluginPerfectionist";

export function createESLintIntegrationPluginPerfectionist(
  options?: Optional<ESLintIntegrationPluginPerfectionistOptions>,
): ESLintIntegrationPluginPerfectionist
{
  return new ESLintIntegrationPluginPerfectionist(options);
}
