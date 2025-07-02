import { AsyncParallelHook } from "tapable";

import { PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC } from "./PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC";
import type { ResolveProjectHookAsync } from "./ResolveProjectHookAsync";

export function createResolveProjectHookAsync(): ResolveProjectHookAsync
{
  return new AsyncParallelHook(
    [
      "project",
    ] as const,
    PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC,
  );
}
