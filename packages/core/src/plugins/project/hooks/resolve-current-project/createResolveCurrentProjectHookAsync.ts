import { AsyncParallelHook } from "tapable";

import { PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC } from "./PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC";
import type { ResolveCurrentProjectHookAsync } from "./ResolveCurrentProjectHookAsync";

export function createResolveCurrentProjectHookAsync(): ResolveCurrentProjectHookAsync
{
  return new AsyncParallelHook(
    [
      "project",
    ] as const,
    PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC,
  );
}
