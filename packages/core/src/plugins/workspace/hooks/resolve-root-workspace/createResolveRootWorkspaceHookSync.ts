import { SyncHook } from "tapable";

import type { ResolveRootWorkspaceHookSync } from "./ResolveRootWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC";

export function createResolveRootWorkspaceHookSync(): ResolveRootWorkspaceHookSync
{
  return new SyncHook(
    [
      "workspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC,
  );
}
