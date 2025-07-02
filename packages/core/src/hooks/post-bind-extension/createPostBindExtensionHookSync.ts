import { SyncHook } from "tapable";

import type { PostBindExtensionHookSync } from "./PostBindExtensionHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC } from "./SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC";

export function createPostBindExtensionHookSync(): PostBindExtensionHookSync
{
  return new SyncHook(
    [
      "context",
      "extension",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_EXTENSION_SYNC,
  );
}
