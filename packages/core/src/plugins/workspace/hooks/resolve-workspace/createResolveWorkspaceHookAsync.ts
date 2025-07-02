import { AsyncParallelHook } from "tapable";

import type { ResolveWorkspaceHookAsync } from "./ResolveWorkspaceHookAsync";
import { WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC } from "./WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC";

export function createResolveWorkspaceHookAsync(): ResolveWorkspaceHookAsync
{
  return new AsyncParallelHook(
    [
      "workspace",
    ] as const,
    WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC,
  );
}
