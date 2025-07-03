import { SyncHook } from "tapable";

import type { ResolveWorkspaceHookSync } from "./ResolveWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC";

export function createResolveWorkspaceHookSync(): ResolveWorkspaceHookSync
{
  return new SyncHook(
    [
      "workspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC,
  );
}
