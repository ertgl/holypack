import { AsyncParallelHook } from "tapable";

import type { ResolveParentWorkspaceHookAsync } from "./ResolveParentWorkspaceHookAsync";
import { WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC";

export function createResolveParentWorkspaceHookAsync(): ResolveParentWorkspaceHookAsync
{
  return new AsyncParallelHook(
    [
      "workspace",
      "parentWorkspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC,
  );
}
