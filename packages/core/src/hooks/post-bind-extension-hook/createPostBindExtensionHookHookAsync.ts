import { AsyncParallelHook } from "tapable";

import type { PostBindExtensionHookHookAsync } from "./PostBindExtensionHookHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC } from "./SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC";

export function createPostBindExtensionHookHookAsync(): PostBindExtensionHookHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "extension",
      "hook",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_ASYNC,
  );
}
