import { AsyncParallelHook } from "tapable";

import type { AugmentContextHookAsync } from "./AugmentContextHookAsync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC } from "./SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC";

export function createAugmentContextHookAsync(): AugmentContextHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_AUGMENT_CONTEXT_ASYNC,
  );
}
