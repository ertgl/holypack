import { SyncHook } from "tapable";

import type { AugmentContextHookSync } from "./AugmentContextHookSync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC } from "./SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC";

export function createAugmentContextHookSync(): AugmentContextHookSync
{
  return new SyncHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC,
  );
}
