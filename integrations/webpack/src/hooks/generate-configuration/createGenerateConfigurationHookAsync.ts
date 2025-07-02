import { AsyncParallelHook } from "tapable";

import type { GenerateConfigurationHookAsync } from "./GenerateConfigurationHookAsync";
import { WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_ASYNC } from "./WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_ASYNC";

export function createGenerateConfigurationHookAsync(): GenerateConfigurationHookAsync
{
  return new AsyncParallelHook(
    [
      "webpackContext",
      "webpackIntegrationOptions",
      "config",
      "options",
    ] as const,
    WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_ASYNC,
  );
}
