import { AsyncParallelHook } from "tapable";

import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC } from "./ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC";
import type { GenerateLinterConfigArrayHookAsync } from "./GenerateLinterConfigArrayHookAsync";

export function createGenerateLinterConfigArrayHookAsync(): GenerateLinterConfigArrayHookAsync
{
  return new AsyncParallelHook(
    [
      "eslintContext",
      "eslintIntegrationOptions",
      "linterConfigArray",
    ] as const,
    ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_ASYNC,
  );
}
