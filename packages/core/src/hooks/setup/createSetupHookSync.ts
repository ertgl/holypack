import { SyncHook } from "tapable";

import type { SetupHookSync } from "./SetupHookSync";
import { SYSTEM_HOOK_UID_SETUP_SYNC } from "./SYSTEM_HOOK_UID_SETUP_SYNC";

export function createSetupHookSync(): SetupHookSync
{
  return new SyncHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_SETUP_SYNC,
  );
}
