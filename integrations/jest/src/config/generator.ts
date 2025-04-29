import type { Config } from "jest";

import type { StrictContext } from "@holypack/core";

import type { JestIntegrationHookSet } from "../eventing";
import {
  HOOK_NAME_JEST_GENERATE_CONFIG,
  HOOK_NAME_JEST_POST_GENERATE_CONFIG,
} from "../hooks";

export async function generateJestConfig(
  context: StrictContext,
  hooks: JestIntegrationHookSet,
): Promise<Config>
{
  const config: Config = {};

  await hooks[HOOK_NAME_JEST_GENERATE_CONFIG].promise(context, config);
  await hooks[HOOK_NAME_JEST_POST_GENERATE_CONFIG].promise(config);

  return config;
}
