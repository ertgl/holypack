import { SyncHook } from "tapable";

import type { EmitWarningHookSync } from "./EmitWarningHookSync";
import { PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_SYNC } from "./PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_SYNC";

export function createEmitWarningHookSync(): EmitWarningHookSync
{
  return new SyncHook(
    [
      "context",
      "err",
    ] as const,
    PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_SYNC,
  );
}
