import { AsyncParallelHook } from "tapable";

import type { PostBindExtensionHookAsync } from "./PostBindExtensionHookAsync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC } from "./SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC";

export function createPostBindExtensionHookAsync(): PostBindExtensionHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "extension",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_ASYNC,
  );
}
