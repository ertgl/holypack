import { SyncHook } from "tapable";

import { PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC } from "./PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC";
import type { ResolveProjectHookSync } from "./ResolveProjectHookSync";

export function createResolveProjectHookSync(): ResolveProjectHookSync
{
  return new SyncHook(
    [
      "project",
    ] as const,
    PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC,
  );
}
