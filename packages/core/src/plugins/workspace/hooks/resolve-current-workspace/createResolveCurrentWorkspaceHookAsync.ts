import { AsyncParallelHook } from "tapable";

import type { ResolveCurrentWorkspaceHookAsync } from "./ResolveCurrentWorkspaceHookAsync";
import { WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC";

export function createResolveCurrentWorkspaceHookAsync(): ResolveCurrentWorkspaceHookAsync
{
  return new AsyncParallelHook(
    [
      "workspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC,
  );
}
