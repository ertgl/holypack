import { AsyncParallelHook } from "tapable";

import type { ResolveSubWorkspaceHookAsync } from "./ResolveSubWorkspaceHookAsync";
import { WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC";

export function createResolveSubWorkspaceHookAsync(): ResolveSubWorkspaceHookAsync
{
  return new AsyncParallelHook(
    [
      "workspace",
      "subWorkspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC,
  );
}
