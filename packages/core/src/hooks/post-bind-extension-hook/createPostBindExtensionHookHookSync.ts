import { SyncHook } from "tapable";

import type { PostBindExtensionHookHookSync } from "./PostBindExtensionHookHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC } from "./SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC";

export function createPostBindExtensionHookHookSync(): PostBindExtensionHookHookSync
{
  return new SyncHook(
    [
      "context",
      "extension",
      "hook",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_HOOK_SYNC,
  );
}
