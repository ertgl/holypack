import { SyncHook } from "tapable";

import type { SealContextHookSync } from "./SealContextHookSync";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC } from "./SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC";

export function createSealContextHookSync(): SealContextHookSync
{
  return new SyncHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_SEAL_CONTEXT_SYNC,
  );
}
