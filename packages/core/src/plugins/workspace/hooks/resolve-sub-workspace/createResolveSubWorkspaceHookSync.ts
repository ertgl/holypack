import { SyncHook } from "tapable";

import type { ResolveSubWorkspaceHookSync } from "./ResolveSubWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC";

export function createResolveSubWorkspaceHookSync(): ResolveSubWorkspaceHookSync
{
  return new SyncHook(
    [
      "workspace",
      "subWorkspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC,
  );
}
