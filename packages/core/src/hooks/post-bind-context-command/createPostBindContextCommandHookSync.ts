import { SyncHook } from "tapable";

import type { PostBindContextCommandHookSync } from "./PostBindContextCommandHookSync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC } from "./SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC";

export function createPostBindContextCommandHookSync(): PostBindContextCommandHookSync
{
  return new SyncHook(
    [
      "context",
      "command",
    ] as const,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC,
  );
}
