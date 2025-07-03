import { AsyncParallelHook } from "tapable";

import type { PostResolveContextHookAsync } from "./PostResolveContextHookAsync";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC } from "./SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC";

export function createPostResolveContextHookAsync(): PostResolveContextHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_ASYNC,
  );
}
