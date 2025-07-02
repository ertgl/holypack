import { AsyncParallelHook } from "tapable";

import type { PostBindContextHookHookAsync } from "./PostBindContextHookHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC } from "./SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC";

export function createPostBindContextHookHookAsync(): PostBindContextHookHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "hook",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC,
  );
}
