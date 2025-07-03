import { AsyncParallelHook } from "tapable";

import type { ResolveConfigHookAsync } from "./ResolveConfigHookAsync";
import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC } from "./SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC";

export function createResolveConfigHookAsync(): ResolveConfigHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "config",
    ] as const,
    SYSTEM_HOOK_UID_RESOLVE_CONFIG_ASYNC,
  );
}
