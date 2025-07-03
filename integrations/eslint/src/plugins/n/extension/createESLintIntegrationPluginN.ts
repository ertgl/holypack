import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginNOptions } from "../options/ESLintIntegrationPluginNOptions";

import { ESLintIntegrationPluginN } from "./ESLintIntegrationPluginN";

export function createESLintIntegrationPluginN(
  options?: Optional<ESLintIntegrationPluginNOptions>,
): ESLintIntegrationPluginN
{
  return new ESLintIntegrationPluginN(options);
}
