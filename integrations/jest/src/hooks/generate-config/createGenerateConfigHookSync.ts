import { SyncHook } from "tapable";

import type { GenerateConfigHookSync } from "./GenerateConfigHookSync";
import { JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_SYNC } from "./JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_SYNC";

export function createGenerateConfigHookSync(): GenerateConfigHookSync
{
  return new SyncHook(
    [
      "jestContext",
      "jestIntegrationOptions",
      "config",
    ] as const,
    JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_SYNC,
  );
}
