import { SyncHook } from "tapable";

import type { ResolveCurrentWorkspaceHookSync } from "./ResolveCurrentWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC";

export function createResolveCurrentWorkspaceHookSync(): ResolveCurrentWorkspaceHookSync
{
  return new SyncHook(
    [
      "workspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC,
  );
}
