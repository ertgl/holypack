import { AsyncParallelHook } from "tapable";

import type { SetupHookAsync } from "./SetupHookAsync";
import { SYSTEM_HOOK_UID_SETUP_ASYNC } from "./SYSTEM_HOOK_UID_SETUP_ASYNC";

export function createSetupHookAsync(): SetupHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    SYSTEM_HOOK_UID_SETUP_ASYNC,
  );
}
