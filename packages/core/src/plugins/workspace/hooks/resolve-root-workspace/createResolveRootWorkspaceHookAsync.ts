import { AsyncParallelHook } from "tapable";

import type { ResolveRootWorkspaceHookAsync } from "./ResolveRootWorkspaceHookAsync";
import { WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC";

export function createResolveRootWorkspaceHookAsync(): ResolveRootWorkspaceHookAsync
{
  return new AsyncParallelHook(
    [
      "workspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC,
  );
}
