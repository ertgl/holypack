import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationPluginCSpellOptions } from "../options/ESLintIntegrationPluginCSpellOptions";

import { ESLintIntegrationPluginCSpell } from "./ESLintIntegrationPluginCSpell";

export function createESLintIntegrationPluginCSpell(
  options?: Optional<ESLintIntegrationPluginCSpellOptions>,
): ESLintIntegrationPluginCSpell
{
  return new ESLintIntegrationPluginCSpell(options);
}
