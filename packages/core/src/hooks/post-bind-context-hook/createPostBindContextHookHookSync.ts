import { SyncHook } from "tapable";

import type { PostBindContextHookHookSync } from "./PostBindContextHookHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC } from "./SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC";

export function createPostBindContextHookHookSync(): PostBindContextHookHookSync
{
  return new SyncHook(
    [
      "context",
      "hook",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC,
  );
}
