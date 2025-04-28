import type { Linter } from "eslint";

import type { StrictContext } from "@holypack/core";

import type { ESLintIntegrationHookSet } from "../eventing";

export async function generateESLintConfigs(
  context: StrictContext,
  hooks: ESLintIntegrationHookSet,
): Promise<Linter.Config[]>
{
  const configs: Linter.Config[] = [];

  await hooks.configGeneration.promise(context, configs);
  await hooks.postConfigGeneration.promise(configs);

  return configs;
}
