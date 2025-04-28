import type { Linter } from "eslint";

import type { StrictContext } from "@holypack/core";

import type { ESLintIntegrationHookSet } from "../eventing";
import {
  HOOK_NAME_ESLINT_GENERATE_CONFIGS,
  HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS,
} from "../hooks";

export async function generateESLintConfigs(
  context: StrictContext,
  hooks: ESLintIntegrationHookSet,
): Promise<Linter.Config[]>
{
  const configs: Linter.Config[] = [];

  await hooks[HOOK_NAME_ESLINT_GENERATE_CONFIGS].promise(context, configs);
  await hooks[HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS].promise(configs);

  return configs;
}
