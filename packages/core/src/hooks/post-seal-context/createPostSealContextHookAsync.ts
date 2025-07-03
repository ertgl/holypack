import { AsyncParallelHook } from "tapable";

import type { PostSealContextHookAsync } from "./PostSealContextHookAsync";
import { SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC } from "./SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC";

export function createPostSealContextHookAsync(): PostSealContextHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_POST_SEAL_CONTEXT_ASYNC,
  );
}
