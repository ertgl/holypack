import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginStylisticOptions } from "../options/ESLintIntegrationPluginStylisticOptions";

import { ESLintIntegrationPluginStylistic } from "./ESLintIntegrationPluginStylistic";

export function createESLintIntegrationPluginStylistic(
  options?: Optional<ESLintIntegrationPluginStylisticOptions>,
): ESLintIntegrationPluginStylistic
{
  return new ESLintIntegrationPluginStylistic(options);
}
