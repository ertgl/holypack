import { SyncHook } from "tapable";

import type { ResolveContextHookSync } from "./ResolveContextHookSync";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC } from "./SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC";

export function createResolveContextHookSync(): ResolveContextHookSync
{
  return new SyncHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC,
  );
}
