import { AsyncParallelHook } from "tapable";

import type { ResolveContextHookAsync } from "./ResolveContextHookAsync";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC } from "./SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC";

export function createResolveContextHookAsync(): ResolveContextHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_RESOLVE_CONTEXT_ASYNC,
  );
}
