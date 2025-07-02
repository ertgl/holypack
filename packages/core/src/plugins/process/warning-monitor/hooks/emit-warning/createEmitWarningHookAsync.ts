import { AsyncParallelHook } from "tapable";

import type { EmitWarningHookAsync } from "./EmitWarningHookAsync";
import { PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_ASYNC } from "./PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_ASYNC";

export function createEmitWarningHookAsync(): EmitWarningHookAsync
{
  return new AsyncParallelHook(
    [
      "context",
      "err",
    ] as const,
    PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_ASYNC,
  );
}
