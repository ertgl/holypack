import { AsyncParallelHook } from "tapable";

import type { SealContextHookAsync } from "./SealContextHookAsync";
import { SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC } from "./SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC";

export function createSealContextHookAsync(): SealContextHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_SEAL_CONTEXT_ASYNC,
  );
}
