import { SyncHook } from "tapable";

import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC } from "./BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC";
import type { GenerateTransformOptionsHookSync } from "./GenerateTransformOptionsHookSync";

export function createGenerateTransformOptionsHookSync(): GenerateTransformOptionsHookSync
{
  return new SyncHook(
    [
      "babelContext",
      "configuratorOptions",
      "transformOptions",
    ] as const,
    BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC,
  );
}
