import { SyncHook } from "tapable";

import type { PostResolveContextHookSync } from "./PostResolveContextHookSync";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC } from "./SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC";

export function createPostResolveContextHookSync(): PostResolveContextHookSync
{
  return new SyncHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC,
  );
}
