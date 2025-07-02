import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginYMLOptions } from "../options/ESLintIntegrationPluginYMLOptions";

import { ESLintIntegrationPluginYML } from "./ESLintIntegrationPluginYML";

export function createESLintIntegrationPluginYML(
  options?: Optional<ESLintIntegrationPluginYMLOptions>,
): ESLintIntegrationPluginYML
{
  return new ESLintIntegrationPluginYML(options);
}
