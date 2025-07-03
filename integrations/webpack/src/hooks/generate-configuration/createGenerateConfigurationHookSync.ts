import { SyncHook } from "tapable";

import type { GenerateConfigurationHookSync } from "./GenerateConfigurationHookSync";
import { WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_SYNC } from "./WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_SYNC";

export function createGenerateConfigurationHookSync(): GenerateConfigurationHookSync
{
  return new SyncHook(
    [
      "webpackContext",
      "webpackIntegrationOptions",
      "config",
      "options",
    ] as const,
    WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_SYNC,
  );
}
