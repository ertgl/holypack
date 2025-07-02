import { SyncHook } from "tapable";

import type { ResolveParentWorkspaceHookSync } from "./ResolveParentWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC";

export function createResolveParentWorkspaceHookSync(): ResolveParentWorkspaceHookSync
{
  return new SyncHook(
    [
      "workspace",
      "parentWorkspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC,
  );
}
