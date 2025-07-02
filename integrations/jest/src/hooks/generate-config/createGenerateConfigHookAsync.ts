import { AsyncParallelHook } from "tapable";

import type { GenerateConfigHookAsync } from "./GenerateConfigHookAsync";
import { JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_ASYNC } from "./JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_ASYNC";

export function createGenerateConfigHookAsync(): GenerateConfigHookAsync
{
  return new AsyncParallelHook(
    [
      "jestContext",
      "jestIntegrationOptions",
      "config",
    ] as const,
    JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_ASYNC,
  );
}
