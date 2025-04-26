import type { Linter } from "eslint";

import type { ResolvedContext } from "@holypack/core";

import type { ESLintIntegrationHookSet } from "../eventing";

export async function generateESLintConfigs(
  resolvedContext: ResolvedContext,
  hooks: ESLintIntegrationHookSet,
): Promise<Linter.Config[]>
{
  const configs: Linter.Config[] = [];

  await hooks.configGeneration.promise(resolvedContext, configs);
  await hooks.postConfigGeneration.promise(configs);

  return configs;
}
