import { AsyncParallelHook } from "tapable";

import type { PostBindContextCommandHookAsync } from "./PostBindContextCommandHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC } from "./SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC";

export function createPostBindContextCommandHookAsync(): PostBindContextCommandHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "command",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC,
  );
}
