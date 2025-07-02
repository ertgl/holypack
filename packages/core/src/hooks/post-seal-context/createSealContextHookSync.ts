import { SyncHook } from "tapable";

import type { PostSealContextHookSync } from "./PostSealContextHookSync";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC } from "./SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC";

export function createPostSealContextHookSync(): PostSealContextHookSync
{
  return new SyncHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_SYNC,
  );
}
