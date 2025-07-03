import { SyncHook } from "tapable";

import { ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC } from "./ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC";
import type { GenerateLinterConfigArrayHookSync } from "./GenerateLinterConfigArrayHookSync";

export function createGenerateLinterConfigArrayHookSync(): GenerateLinterConfigArrayHookSync
{
  return new SyncHook(
    [
      "eslintContext",
      "eslintIntegrationOptions",
      "linterConfigArray",
    ] as const,
    ESLINT_INTEGRATION_HOOK_UID_GENERATE_LINTER_CONFIG_ARRAY_SYNC,
  );
}
