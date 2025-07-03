import { SyncHook } from "tapable";

import { PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC } from "./PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC";
import type { ResolveCurrentProjectHookSync } from "./ResolveCurrentProjectHookSync";

export function createResolveCurrentProjectHookSync(): ResolveCurrentProjectHookSync
{
  return new SyncHook(
    [
      "project",
    ] as const,
    PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC,
  );
}
