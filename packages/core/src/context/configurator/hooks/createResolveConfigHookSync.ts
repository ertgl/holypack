import { SyncHook } from "tapable";

import type { ResolveConfigHookSync } from "./ResolveConfigHookSync";
import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC } from "./SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC";

export function createResolveConfigHookSync(): ResolveConfigHookSync
{
  return new SyncHook(
    [
      "context",
      "config",
    ] as const,
    SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC,
  );
}
